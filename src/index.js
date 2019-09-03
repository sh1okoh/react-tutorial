import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./mutations";
import { GameContainer } from "./containers";
import { combineEpics, createEpicMiddleware }  from "redux-observable";
import { informationEpics } from "./epics";
import { logger } from "./middleware";
import "./index.css";

const epic = combineEpics(...informationEpics);
const epicMiddleware = createEpicMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(logger, epicMiddleware),
);

epicMiddleware.run(epic)

render(
  <Provider store={store}>
    <GameContainer />
  </Provider>,
  document.getElementById("root")
)