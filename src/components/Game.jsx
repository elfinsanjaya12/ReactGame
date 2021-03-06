import React, { Component } from "react";

import Board from "./Board";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      isXNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    // If win or clicking on same square
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.isXNext ? "X" : "O";

    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      isXNext: !this.state.isXNext
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move # " + move : "Go to game start";

      const stepClass = this.state.stepNumber === move ? "active" : "";

      return (
        <li className={stepClass} key={move}>
          <button className={stepClass} onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    let status = "";
    if (winner) {
      status = "The Winner is : " + winner;
    } else {
      status = "Next Turn is " + (this.state.isXNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <button>Toggle Sort</button>
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  jumpTo(move) {
    this.setState({
      stepNumber: move,
      isXNext: move % 2 === 0
    });
  }

  calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };
}

export default Game;
