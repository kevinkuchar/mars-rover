import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { GRID_SIZE, GRID_GAP, ROVER_SIZE } from '../constants';

@inject('PositionStore')
@observer
class Rover extends Component {
  _calculateCoordinate(pos) {
    const centerValue = (GRID_SIZE - GRID_GAP - ROVER_SIZE) / 2
    return GRID_SIZE * pos + GRID_GAP + centerValue;
  }

  render() {
    const { roverPosition, roverRotation, isRoverOutOfBounds } = this.props.PositionStore;

    const left = this._calculateCoordinate(roverPosition.x);
    const top = this._calculateCoordinate(roverPosition.y);
    const transform = `rotate(${roverRotation}deg)`;

    const style = { left, top, transform };

    if (isRoverOutOfBounds) {
      return <div />;
    }

    return (
      <div style={style} className="rover"></div>
    );
  }
}

export default Rover;
