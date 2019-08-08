import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  const classNameValue = `square ${props.isHighlight ? 'highlight' : ''}`
  return (
    <button className={classNameValue} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
      isReverse: false,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      isReverse: false
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const stepNumber = this.state.stepNumber
    const current = history[stepNumber];
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
          this.jumpTo(move);
        }} className={this.state.stepNumber === move ? 'colored' : ''}>{desc}</button>
        </li>
      );
    });

    let status;
    console.log(winner);
    if (winner) {
      status = 'Winner: ' + winner.squares;
    } else if (winner === null && stepNumber === 9) {
      status = 'draw！'
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
            highlightSquares={ winner ? winner.line : []}
          />
        </div>
        <div className="game-info">
        <button onClick={()=> {
          this.setState({
            isReverse: !this.state.isReverse
          })
        }}>toggleEvent</button>
          <div>{status}</div>
          <ol>{this.state.isReverse ? moves : moves.reverse()}</ol>
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
      return {
        squares: squares[a],
        line: lines[i]
      };
    }
  }
  return null;
}
