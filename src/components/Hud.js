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
              <input type="text" className="hud__input" readonly value={this.stringifyCommands(commands)}  />
            </div>

            <p class="hud__last-sent-commands">Last Issued Commands: {this.stringifyCommands(lastSentCommands)}</p>
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
