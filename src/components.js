import React from 'react';
import { calculateWinner } from "./utils.js";

function Square(props) {
  const classNameValue = `square ${props.isHighlight ? 'highlight' : ''}`
  return (
    <button className={classNameValue} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export class Board extends React.Component {
  renderSquare(i, isHighlight) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={i}
        isHighlight={isHighlight}
      />
    );
  }
  render() {
    return (
      <div>
        {
          Array(3).fill(0).map((row, i) => {
            return (
              <div className="board-row" key={i}>
                {
                  Array(3).fill(0).map((col, j) => {
                    return(
                      this.renderSquare(i * 3 + j, this.props.highlightSquares.includes(i * 3 + j))
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    );
  }
}

export function Game(props) {
  const { history, stepNumber, isReverse, handleClick, jumpTo, reverseHistory, xIsNext } = props;
  const current = history[stepNumber]
  const winner = calculateWinner(current.squares);
  let desc;
  const moves = history.map((step, move) => {
    if (move !== 0) {
      const oldSquares = history[move-1]["squares"];
      const newSquares = history[move]["squares"];
      const diffIndex = newSquares.findIndex((v, i) => oldSquares[i] !== v);
      const col = diffIndex % 3 + 1;
      const row = Math.floor(diffIndex / 3) + 1;
      desc = '(' + row + ',' + col + ')';
    } else {
      desc = 'Go to game start';
    }
    return(
      <li key={move}>
      <button onClick={() => {
        jumpTo(move);
      }} className={stepNumber === move ? 'colored' : ''}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = 'Winner: ' + winner.squares;
  } else if (stepNumber === 9) {
    status = 'Draw！'
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => {
            handleClick(i)
          }}
          highlightSquares={ winner ? winner.line : []}
        />
      </div>
      <div className="game-info">
      <button onClick={(i)=> {
        reverseHistory(i)
      }}>toggleEvent</button>
        <div>{status}</div>
        <ol>{isReverse ? moves : moves.reverse()}</ol>
      </div>
    </div>
  );
}