import React, { Component } from 'react';

class Map extends Component {
  render() {
    return (
      <div className="map">
        {this.props.children}
      </div>
    );
  }
}

export default Map;
