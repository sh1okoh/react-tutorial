import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./mutations";
import { GameContainer } from "./containers";
import { logger } from "./containers";
import "./index.css";


const store = createStore(
  rootReducer,
  applyMiddleware(logger),
);

render(
  <Provider store={store}>
    <GameContainer />
  </Provider>,
  document.getElementById("root")
);