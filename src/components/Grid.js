import React, { Component } from 'react';

const NUM_COLS = 10;
const NUM_ROWS = 7;

class Grid extends Component {
  createGridItems() {
    return Array(NUM_ROWS * NUM_COLS)
      .fill('')
      .map((item, index) => (
        <div key={`grid.${index}`} className="grid__item">
          <div className="grid__item__box"></div>
        </div>
      ));
  }

  render() {
    return (
      <div className="grid">
        {this.createGridItems()}
      </div>
    );
  }
}

export default Grid;
