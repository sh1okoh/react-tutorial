import { createAggregate } from 'redux-aggregate'
import { calculateWinner } from "./utils.js"

const gameMT = {
  clickSquare(state, index) {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[index]) {
      return {
        ...state
      }
    }
    squares[index] = state.xIsNext ? 'X' : 'O';
    return {
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext,
      isReverse: state.isReverse
    }
  },
  jumpToPast(state, step) {
    return {
      ...state,
      stepNumber: step,
      xIsNext: ( step % 2 ) === 0
    }
  },
  reverseHistory(state) {
    return {
      ...state,
      isReverse: !state.isReverse
    }
  },
};

export const initialState = {
  history: [
    {
      squares: Array(9).fill(null)
    }
  ],
  stepNumber: 0,
  xIsNext: true,
  isReverse: false
}

const gameAggregate = createAggregate(gameMT, "game/");
export const gameCreators = gameAggregate.creators;
export const gameReducer = gameAggregate.reducerFactory(initialState);
