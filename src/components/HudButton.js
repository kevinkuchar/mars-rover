import React, { Component } from 'react';

const HudButton = ({ direction  }) => {
  return (
    <div className="hud__button">
      {direction}
    </div>
  )
}

export default HudButton;
