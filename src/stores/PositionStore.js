import { observable, action, computed, toJS } from 'mobx';
import { getRandomX, getRandomY } from '../utils';
import { COMMANDS, DIRECTIONS, GRID_HEIGHT, GRID_WIDTH, NUM_OBSTACLES } from '../constants';

class PositionStore {
  constructor() {
    this.createObstacles(NUM_OBSTACLES);
    this.createRover();
  }

  // Animation timeout variable
  animationTimeout = null;

  // Order of directions used to determine turns
  compass = [
    DIRECTIONS.NORTH,
    DIRECTIONS.WEST,
    DIRECTIONS.SOUTH,
    DIRECTIONS.EAST
  ];

  // Last set of commands sent by user
  @observable lastSentCommands = [];

  // Current rover rotation in degrees
  @observable roverRotation = 0;

  // Rover position object that tracks x, y and direction
  @observable roverPosition = {
    direction: DIRECTIONS.NORTH
  }

  // Used for edge case of rover crossing bounds into an obstacle.
  @observable previousPosition = {};

  // Whether or not there is an obstruction ahead
  @observable isCollision = false;
  @observable collisionCoords = {};

  // Array of obstacle positions
  @observable obstacles = [];

  @action updateRoverPosition(obj) {
    const newCoords = { ...this.roverPosition, ...obj };
    if (this.isObstructed(newCoords)) {
      this.isCollision = true;
      this.collisionCoords = newCoords;
      if (this.isRoverOutOfBounds) {
        this.roverPosition = { ...this.previousPosition };
      }
      clearTimeout(this.animationTimeout);
    } else {
      this.isCollision = false;
      this.previousPosition = { ...this.roverPosition };
      this.roverPosition = newCoords;
    }
  }

  /**
   * Checks if rover is off the grid.
   * @return {Boolean} - Is rover out of bounds
   */
  @computed get isRoverOutOfBounds() {
    const { x, y } = this.roverPosition;
    return (y < 0 || y > GRID_HEIGHT) || (x < 0 || x > GRID_WIDTH);
  }

  /**
   * Checks if the Rover has crossed over the bounds of the grid.
   * If so, sets the Rover's position to the opposite side of the grid.
   */
  @action setRoverInBounds() {
    const { x, y } = this.roverPosition;

    if (y < 0) {
      this.updateRoverPosition({ y: GRID_HEIGHT });
    } else if (y > GRID_HEIGHT) {
      this.updateRoverPosition({ y: 0 });
    }

    if (x < 0) {
      this.updateRoverPosition({ x: GRID_WIDTH });
    } else if (x > GRID_WIDTH) {
      this.updateRoverPosition({ x: 0 });
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
      default:
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
      default:
        break;
    }

    if (commands.length) {
      commands.shift();

      if (this.isRoverOutOfBounds) {
        commands.unshift(COMMANDS.SET_BOUNDS);
      }

      // Allow time for animation
      this.animationTimeout = setTimeout(() => this.readCommand(commands), 600)
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

  isObstructed(coords) {
    const obstacles = toJS(this.obstacles);

    return obstacles.some(item => {
      return item.x === coords.x && item.y === coords.y;
    });
  }


  /**
   * Create random obstacles
   * TODO: ensure no duplicate obstacles are created
   * @param {Integer} num - Number of obstacles
   */
  createObstacles(num) {
    let empty = Array(num).fill({});
    let obstacles = empty.map(item => {
      return {
        x: getRandomX(),
        y: getRandomY()
      }
    })

    this.obstacles = obstacles;
  }

  /**
   * Creates initial Rover coordinates
   */
  createRover() {
    const coords = {
      x: getRandomX(),
      y: getRandomY()
    }

    if (this.isObstructed(coords)) {
      this.createRover();
    } else {
      this.updateRoverPosition({ x: coords.x, y: coords.y });
    }
  }
}

export default new PositionStore();
