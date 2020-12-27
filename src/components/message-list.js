import React from "react";
import ReactDOM from "react-dom";
import Message from "./message";

class MessageList extends React.Component {
  componentWillUpdate() {
    // Prevent automatic scroll when user on scrolling
    const node = ReactDOM.findDOMNode(this);
    this.shouldScrollToBottom =
      node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
  }

  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
      // Automatic scroll to bottom when receive new message
      const node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }

  render() {
    if (!this.props.roomId) {
      return (
        <div className="message-list">
          <div className="join-room">&larr; Join a room!</div>
        </div>
      );
    }
    return (
      <div className="message-list">
        {this.props.messages.map((m, i) => (
          <Message key={i} username={m.senderId} text={m.text} />
        ))}
      </div>
    );
  }
}

export default MessageList;
