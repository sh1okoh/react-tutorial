import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { tsThisType } from '@babel/types';
import { get } from 'http';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


class Board extends React.Component {
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length-1]
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat({
        squares: squares,
      }),
      xIsNext: !this.state.xIsNext,
    });
  }
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    console.log("@@@", history)
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

//   coloring(step) {
//     const elem = document.getElementsByTagName('li');
//     const num = elem.length;
//     for (var i = 0; i < num; i++) {
//       if (elem[i].className === 'colored') {
//         elem[i].classList.remove('colored');
//       }
//     }
//     document.getElementById(step).classList.add('colored');
//   }

  render() {
    const history = this.state.history;
    let isLastBtn = false
    const stepNumber = this.state.stepNumber
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      if (move !== 0) {
        const oldArr = history[move-1]["squares"];
        const newArr = history[move]["squares"];
        const diffIndex = newArr.findIndex((v, i) => oldArr[i] !== v);
        const col = diffIndex % 3 + 1;
        const row = Math.floor(diffIndex / 3) + 1;
        const desc = '(' + col + ',' + row + ')';
        if (move === stepNumber) {
          isLastBtn = !isLastBtn
        }
        return(
          <li key={move}>
          <button onClick={() => {
            this.jumpTo(move);
          }} className={this.state.stepNumber === move ? 'colored' : ''}>{desc}</button>
          </li>
        );
      } else {
        const desc = 'Go to game start';
        return(
          <li key={move}>
          <button onClick={
          () => this.jumpTo(move)
          } className={this.state.stepNumber === move ? 'colored' : ''}>{desc}</button>
          </li>
        );
      }
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => {
                this.handleClick(i)
            }}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
