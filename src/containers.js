import { connect } from "react-redux";
import { clickSquare, jumpToPast, buttonToReverseHistory } from "./actions";
import { Game } from "./components";

const mapStateToProps = (state, ownProps) => {
  return state.game;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClick: index => {
      dispatch(clickSquare(index));
    },
    jumpTo: step => {
      dispatch(jumpToPast(step));
    },
    reverseHistory: step => {
      dispatch(buttonToReverseHistory(step));
    }
  };
};

export const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);