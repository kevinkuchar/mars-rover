# Mars Rover
### Set Up
- npm install
- npm start

### Browser Support
This project was developed and tested in latest Google Chrome

### Requirements
- Develop an api that moves a rover around on a grid.
- You are given the initial starting point (x,y) of a rover and the direction (N,S,E,W) it is facing.
- The rover receives a character array of commands.
- Implement commands that move the rover forward/backward (f,b).
- Implement commands that turn the rover left/right (l,r).
- Implement wrapping from one edge of the grid to another. (planets are spheres after all)
- Implement obstacle detection before each move to a new square. If a given sequence of commands encounters an obstacle, the rover moves up to the last possible point and reports the obstacle.

### Known issues
- Strange rotation behavior when crossing bounds due to CSS transition being re-applied to the transform property upon the Rovers re-entry.

### Time Spent
Overall I spent about 7 hours on this project. Though a large chunk of that was me unnecessarily messing with the design and CSS. I probably spent around 4 total hours on the React/JavaScript and position/collision logic.

### Improvements
If more time was spent on this project I would:
- Reduce the amount of responsibility the PositionStore has.
- Set up a linter to ensure code styles are consistent.
- Add unit tests to position and command logic.
- Add more code comments.
