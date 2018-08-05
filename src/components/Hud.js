import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import HudButton from './HudButton';

@inject('PositionStore')
@observer
class Hud extends Component {
  render() {
    const { sendRoverCommands, roverPosition } = this.props.PositionStore;
const style = {color: 'white'}
    return (
      <div className="hud" onClick={sendRoverCommands}>
        <div className="hud__buttons-container">
          <HudButton direction="up" />
          <HudButton direction="down" />
          <HudButton direction="left" />
          <HudButton direction="right" />
        </div>
        <div style={style}>
          <p>{roverPosition.direction}</p>
          <p>{roverPosition.x}</p>
          <p>{roverPosition.y}</p>
        </div>
      </div>
    );
  }
}

export default Hud;
