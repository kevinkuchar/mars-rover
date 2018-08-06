import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { calculateCoordinates } from '../utils';

@inject('PositionStore')
@observer
class Rover extends Component {
  render() {
    const { roverPosition, roverRotation, isRoverOutOfBounds } = this.props.PositionStore;

    const left = calculateCoordinates(roverPosition.x);
    const top = calculateCoordinates(roverPosition.y);
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
