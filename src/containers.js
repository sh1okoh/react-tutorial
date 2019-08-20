import { connect } from "react-redux";
import { clickSquare, jumpToPast, reverseHistory } from "./actions";
import { Game, Board } from "./components";
import { calculateWinner } from "./utils";

const mapStateToPropsForGameComponent = (state, ownProps) => {
  const { history, stepNumber, xIsNext, isReverse} = state.game
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
      dispatch(jumpToPast(step));
    },
    reverseHistory: () => {
      dispatch(reverseHistory());
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
      dispatch(clickSquare(index));
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


