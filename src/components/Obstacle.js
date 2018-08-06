import React, { Component } from 'react';
import { calculateCoordinates } from '../utils';

class Obstacle extends Component {
  render() {
    const { pos } = this.props;

    const left = calculateCoordinates(pos.x);
    const top = calculateCoordinates(pos.y);
    const style = { left, top };

    return (
      <div style={style} className="obstacle"></div>
    );
  }
}

export default Obstacle;
