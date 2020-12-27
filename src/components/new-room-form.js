import React from "react";

class NewRoomForm extends React.Component {
  constructor() {
    super();
    this.state = {
      roomName: ""
    };
  }

  handleChange = e => {
    this.setState({
      roomName: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createRoom(this.state.roomName);
    this.setState({ roomName: "" });
  };

  render() {
    return (
      <div className="new-room-form">
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.roomName}
            onChange={this.handleChange}
            type="text"
            placeholder="Create new room..."
            required
          />
          <button id="create-room-btn" type="submit">
            <strong>+</strong>
          </button>
        </form>
      </div>
    );
  }
}

export default NewRoomForm;
