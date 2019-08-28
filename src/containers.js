import { connect } from "react-redux";
import { Game, Board } from "./components";
import { calculateWinner } from "./utils";
import {　gameCreators } from "./mutations"
const mapStateToPropsForGameComponent = (state, ownProps) => {
  const { history, stepNumber, xIsNext, isReverse} = state
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner.squares;
  } else if (stepNumber === 9) {
    status = "Draw!";
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  return {history, stepNumber, current, status, isReverse, winner};
};

const mapDispatchToPropsForGameComponent = (dispatch, ownProps) => {
  return {
    jumpTo: step => {
      dispatch(gameCreators.jumpToPast(step));
    },
    reverseHistory: () => {
      dispatch(gameCreators.reverseHistory());
    }
  };
};

const mapStateToPropsForBoardComponent = (state, ownProps) => {
  const { history, stepNumber } = state;
  const { squares } = history[stepNumber];
  return { squares }
}

const mapDispatchToPropsForBoardComponent = (dispatch, ownProps) => {
  return {
    handleClick: index => {
      dispatch(gameCreators.clickSquare(index));
    }
  }
}

export const GameContainer = connect(
  mapStateToPropsForGameComponent,
  mapDispatchToPropsForGameComponent
)(Game);

export const BoardContainer = connect(
  mapStateToPropsForBoardComponent,
  mapDispatchToPropsForBoardComponent
)(Board);

export const logger = store => next => action => {
  console.log(action);
  console.log('previous state', store.getState());
  let result = next(action);
  console.log('next state', store.getState());
  return result;
}