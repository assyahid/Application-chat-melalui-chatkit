import React from "react";

class RoomList extends React.Component {
  render() {
    // Sort rooms by id
    const orderedRooms = [...this.props.rooms].sort((a, b) => a.id - b.id);
    return (
      <div className="rooms-list">
        <ul>
          <h3>Your rooms:</h3>
          { /* Populate all room that has been ordered */ 
          orderedRooms.map(room => {
            // Toggle 'active' class on selected room
            const active = this.props.roomId === room.id ? "active" : "";
            return (
              <li key={room.id} className={`room ${active}`}>
                <a
                  onClick={() => this.props.subscribeToRoom(room.id)}
                  href="#1"
                >
                  # {room.name}{this.props.roomId === room.id ? " *" : ""}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default RoomList;
