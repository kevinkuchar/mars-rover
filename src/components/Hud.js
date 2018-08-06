import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { COMMANDS } from '../constants';
import HudButton from './HudButton';

@inject('CommandStore')
@inject('PositionStore')
@observer
class Hud extends Component {
  onCommandClick = (command) => {
    const { addCommand } = this.props.CommandStore;
    return () => addCommand(command);
  }

  onFormSubmit = (event) =>{
    event.preventDefault();
    const { sendRoverCommands } = this.props.PositionStore;
    const { commands, clearCommands } = this.props.CommandStore;

    sendRoverCommands(commands);
    clearCommands();
  }

  stringifyCommands(commands) {
    return commands.join(', ');
  }

  render() {
    const { commands } = this.props.CommandStore;
    const { roverPosition, lastSentCommands } = this.props.PositionStore;

    return (
      <div className="hud">
        <form className="hud__form" onSubmit={this.onFormSubmit}>
          <div>
            <div className="hud__buttons-container">
              <HudButton onClick={this.onCommandClick(COMMANDS.FORWARD)}>Forward</HudButton>
              <HudButton onClick={this.onCommandClick(COMMANDS.BACKWARD)}>Backward</HudButton>
              <HudButton onClick={this.onCommandClick(COMMANDS.LEFT)}>Left</HudButton>
              <HudButton onClick={this.onCommandClick(COMMANDS.RIGHT)}>Right</HudButton>
            </div>

            <div className="hud__input-container">
              <input type="text" className="hud__input" readOnly value={this.stringifyCommands(commands)}  />
            </div>

            <p className="hud__message">Last Issued Commands: {this.stringifyCommands(lastSentCommands)}</p>
            <p className="hud__message">Rover Position: X:{roverPosition.x + 1} Y:{roverPosition.y + 1} Direction:{roverPosition.direction}</p>
          </div>
          <div>
            <input type="submit" className="hud__submit" value="Send" />
          </div>
        </form>
      </div>
    );
  }
}

export default Hud;
