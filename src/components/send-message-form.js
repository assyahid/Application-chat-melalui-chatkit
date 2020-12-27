import React from "react";

class SendMessageForm extends React.Component {
  constructor(props) {
    super(props);
    // Decalre message input to state
    this.state = {
      message: ""
    };
  }

  handleChange = e => {
    // Save input to state (message) while text has changed
    this.setState({
      message: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // Handle action on submit was triggered
    this.props.sendMessage(this.state.message);

    // Clear input
    this.setState({
      message: ""
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="send-message-form">
        <input
          disabled={this.props.disabled}
          onChange={this.handleChange}
          value={this.state.message}
          placeholder="Type message andhit Enter"
          type="text"
        />
      </form>
    );
  }
}

export default SendMessageForm;
