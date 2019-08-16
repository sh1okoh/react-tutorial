import { connect } from "react-redux";
import { clickSquare, jumpToPast, reverseHistory } from "./actions";
import { Game } from "./components";
import { calculateWinner } from "./utils";

const mapStateToProps = (state, ownProps) => {
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClick: index => {
      dispatch(clickSquare(index));
    },
    jumpTo: step => {
      dispatch(jumpToPast(step));
    },
    reverseHistory: () => {
      dispatch(reverseHistory());
    }
  };
};

export const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);