import React from 'react';
import { BoardContainer } from './containers';

function Square(props) {
  const { value, onClick } = props
  const classNameValue = `square ${props.isHighlight ? 'highlight' : ''}`
  return (
    <button className={classNameValue} onClick={onClick}>
      {value}
    </button>
  );
}

export function Board(props) {
  const { squares, handleClick, highlightSquares } = props
  function renderSquare(i, isHighlight) {
    return (
      <Square
        value={ squares[i] }
        onClick={() => handleClick(i)}
        key={i}
        isHighlight={ isHighlight }
      />
    );
  }
  return (
    <div>
      {
        Array(3).fill(0).map((row, i) => {
          return (
            <div className="board-row" key={i}>
              {
                Array(3).fill(0).map((col, j) => {
                  return(
                    renderSquare(i * 3 + j, highlightSquares.includes(i * 3 + j))
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

export function Game(props) {
  const { history, stepNumber, jumpTo, isReverse, reverseHistory, current, status, winner} = props
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

  return (
    <div className="game">
      <div className="game-board">
        <BoardContainer
          squares={current.squares}
          highlightSquares={ winner ? winner.line : []}
        />
      </div>
      <div className="game-info">
      <button onClick={()=> {
        reverseHistory()
      }}>toggleEvent</button>
        <div>{status}</div>
        <ol>{isReverse ? moves : moves.reverse()}</ol>
      </div>
    </div>
  );
}