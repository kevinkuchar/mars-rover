import React from 'react';

const HudButton = ({ children, onClick  }) => {
  return (
    <div className="hud__button" onClick={onClick}>
      {children}
    </div>
  )
}

export default HudButton;
