import React from "react";

export default props => (
  <div className="message">
    <div className="message-username">{props.username}</div>
    <div className="message-text">{props.text}</div>
  </div>
);
