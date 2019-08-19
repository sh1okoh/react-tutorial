import { connect } from "react-redux";
import { clickSquare, jumpToPast, reverseHistory } from "./actions";
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
    reverseHistory: () => {
      dispatch(reverseHistory());
    }
  };
};

export const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);