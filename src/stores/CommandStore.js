import { observable, action, toJS } from 'mobx';

class CommandStore {
  // User entered commands
  @observable commands = [];

  /**
   * Adds a command to the commands array
   * @param {String} command - New command
   */
  @action addCommand = (command) => {
    this.commands = [...toJS(this.commands), command];
  }

  /**
   * Clears commands array
   */
  @action clearCommands = () => {
    this.commands = [];
  }
}

export default new CommandStore();
