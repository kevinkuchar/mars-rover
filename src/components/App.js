import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Console from './Console'
import Map from './Map';
import Hud from './Hud';
import Grid from './Grid';
import Rover from './Rover';
import Obstacle from './Obstacle';
import Notification from './Notification';
import '../styles/index.scss';

@inject('PositionStore')
@observer
class App extends Component {
  renderObstacles() {
    const { obstacles } = this.props.PositionStore;
    return obstacles.map(pos => (
      <Obstacle pos={pos} />
    ));
  }

  renderNotification() {
    const { collisionCoords } = this.props.PositionStore;
    return <Notification
        text="Collision Ahead!"
        subText={`There is an obstacle located at [${collisionCoords.x + 1},${collisionCoords.y + 1}]`}
    />
  }

  render() {
    const { isCollision } = this.props.PositionStore;
    return (
      <Console>
        <Map>
          {isCollision ? this.renderNotification() : null}
          {this.renderObstacles()}
          <Grid />
          <Rover />
        </Map>
        <Hud />
      </Console>
    );
  }
}

export default App;
