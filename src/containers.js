import { connect } from "react-redux";
import { Game, Board, Information } from "./components.jsx";
import { calculateWinner } from "./utils";
import {　gameCreators, informationCreators } from "./mutations";

const mapStateToPropsForGameComponent = (state, ownProps) => {
  const { history, stepNumber, xIsNext, isReverse} = state.game;
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
  const { history, stepNumber } = state.game;
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

const mapStateToPropsForInformation = (state, ownProps) => {
  return state.information;
};

const mapDispatchToPropsForInformation = (dispatch, ownProps) => {
  return {
    fetchInformation: () => {
      dispatch(informationCreators.fetchIPAddress());
    }
  };
};

export const InformationContainer = connect(
  mapStateToPropsForInformation,
  mapDispatchToPropsForInformation
)(Information);

export const GameContainer = connect(
  mapStateToPropsForGameComponent,
  mapDispatchToPropsForGameComponent
)(Game);

export const BoardContainer = connect(
  mapStateToPropsForBoardComponent,
  mapDispatchToPropsForBoardComponent
)(Board);
