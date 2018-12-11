import React, { Component } from "react";

import Square from "./Square";

class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    let rows = [];
    let cols = [];
    for (let r = 0; r < 3; r++) {
      for (let c = r * 3; c < r * 3 + 3; c++) {
        cols.push(this.renderSquare(c));
      }
      rows.push(
        <div key={r} className="board-row">
          {cols}
        </div>
      );
      cols = [];
    }
    return <div>{rows}</div>;
  }
}

export default Board;
