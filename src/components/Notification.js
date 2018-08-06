import React from 'react';

const Notification = ({ text, subText }) => {
  return (
    <div className="notification">
      <div className="notification__bg"></div>
      <div className="notification__message">
        <div className="notification__heading">{text}</div>
        <div className="notification__copy">{subText}</div>
      </div>
    </div>
  )
}

export default Notification;
