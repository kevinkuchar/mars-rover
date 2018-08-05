import React, { Component } from 'react';
import '../styles/index.scss';
// import logo from './logo.svg';

import Console from './Console'
import Map from './Map';
import Hud from './Hud';
import Grid from './Grid';
import Rover from './Rover';

class App extends Component {
  render() {
    return (
      <Console>
        <Map>
          <Grid />
          <Rover />
        </Map>
        <Hud />
      </Console>
    );
  }
}

export default App;
