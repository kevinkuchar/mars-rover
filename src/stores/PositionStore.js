import { observable, action, computed, toJS } from 'mobx';
import { COMMANDS, DIRECTIONS } from '../constants';

class PositionStore {
  constructor() {}

  compass = [
    DIRECTIONS.NORTH,
    DIRECTIONS.WEST,
    DIRECTIONS.SOUTH,
    DIRECTIONS.EAST
  ];

  // Current rover rotation in degrees
  @observable roverRotation = 0;

  // Rover position object that tracks x, y and direction
  @observable roverPosition = {
    direction: DIRECTIONS.NORTH,
    x: 5,
    y: 3
  }

  // Last set of commands sent by user
  @observable lastSentCommands = [];

  // Array of obstacle positions
  @observable obstaclePosition = [
    {x: 4, y: 5}
  ];

  @action updateRoverPosition(obj) {
    this.roverPosition = { ...this.roverPosition, ...obj };
  }

  /**
   * Checks if rover is off the grid.
   * @return {Boolean} - Is rover out of bounds
   */
  @computed get isRoverOutOfBounds() {
    const { x, y } = this.roverPosition;
    return (y < 0 || y > 6) || (x < 0 || x > 9);
  }

  /**
   * Checks if the Rover has crossed over the bounds of the grid.
   * If so, sets the Rover's position to the opposite side of the grid.
   */
  @action setRoverInBounds() {
    const { x, y } = this.roverPosition;

    if (y < 0) {
      this.roverPosition.y = 6;
    } else if (y > 6) {
      this.roverPosition.y = 0;
    }

    if (x < 0) {
      this.roverPosition.x = 9;
    } else if (x > 9) {
      this.roverPosition.x = 0;
    }
  }

  /**
   * Updates the Y Position of the Rover based on the direction
   * @param {Integer} dif - 1 or -1
   */
  @action updateRoverPositionY(dif) {
    const y = this.roverPosition.y + dif;
    this.updateRoverPosition({ y });
  }

  /**
  * Updates the X Position of the Rover based on the direction
  * @param {Integer} dif - 1 or -1
   */
  @action updateRoverPositionX(dif) {
    const x = this.roverPosition.x + dif;
    this.updateRoverPosition({ x });
  }

  /**
   * Updates the Rover position object based on the command and
   * the direction it is facing
   * @type {Boolean}
   */
  @action moveRover(command) {
    const { direction } = this.roverPosition;
    const isFoward = command === COMMANDS.FORWARD;

    switch (direction) {
      case DIRECTIONS.NORTH:
        this.updateRoverPositionY(isFoward ? -1 : 1);
        break;
      case DIRECTIONS.SOUTH:
        this.updateRoverPositionY(isFoward ? 1 : -1);
        break;
      case DIRECTIONS.EAST:
        this.updateRoverPositionX(isFoward ? 1 : -1);
        break;
      case DIRECTIONS.WEST:
        this.updateRoverPositionX(isFoward ? -1 : 1);
        break;
    }
  }

  /**
   * Updates the direction of the rover in the roverPosition object
   * based on command
   * @param {String} command - Current command
   */
  @action changeDirection(command) {
    const { compass, roverPosition } = this;
    const { direction } = roverPosition;
    let newDirection;

    const curIndex = compass.findIndex(item => item === direction);
    const newIndex = command === COMMANDS.LEFT ? curIndex + 1 : curIndex - 1;
    if (command === COMMANDS.LEFT) {
      newDirection = newIndex > 3 ? compass[0] : compass[newIndex];
    } else if (command === COMMANDS.RIGHT) {
      newDirection = newIndex < 0 ? compass[3] : compass[newIndex];
    }

    this.updateRoverPosition({ direction: newDirection });
  }

  /**
   * Updates roverRotation property based on command
   * @param {String} command - Current command
   */
  @action rotateRover(command) {
    const { roverRotation } = this;
    const isLeft = command === COMMANDS.LEFT;

    this.roverRotation = isLeft ? roverRotation - 90 : roverRotation + 90;
  }

  /**
   * Reads the next command in the commands array and issues
   * an order or sequence of orders.
   * @param  {Array} _commands - Array of Commands
   */
  readCommand(_commands) {
    const commands = [..._commands];
    const currentCommand = commands[0];

    switch(currentCommand) {
      case COMMANDS.FORWARD:
      case COMMANDS.BACKWARD:
        this.moveRover(currentCommand);
        break;
      case COMMANDS.LEFT:
      case COMMANDS.RIGHT:
        this.rotateRover(currentCommand);
        this.changeDirection(currentCommand);
        break;
      case COMMANDS.SET_BOUNDS:
        this.setRoverInBounds();
        break;
    }

    if (commands.length) {
      commands.shift();

      if (this.isRoverOutOfBounds) {
        commands.unshift(COMMANDS.SET_BOUNDS);
      }
      
      // Allow time for animation
      setTimeout(() => this.readCommand(commands), 600)
    }
  }

  /**
   * Sends an array of commands to the readCommands function
   * @param {Array} - commands - User issued commands
   */
  @action sendRoverCommands = (commands) => {
    this.lastSentCommands = commands;
    this.readCommand(commands);
  }
}

export default new PositionStore();
