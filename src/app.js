import React from "react";
import Chatkit from "@pusher/chatkit";
import MessageList from "./components/message-list";
import SendMessageForm from "./components/send-message-form";
import RoomList from "./components/room-list";
import NewRoomForm from "./components/new-room-form";

import { tokenUrl, instanceLocator } from "./config";

class App extends React.Component {
  constructor(props) {
    super(props);

    // Declare state for room id, messages, room can joid, and room has been joined.
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    };
  }

  componentDidMount() {
    // Initializing Chatkit connection
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: "drv", // User id been registered on Chatkit console (https://dash.pusher.com/chatkit)
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    });

    // Connect to Chatkit
    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser; // Save current user
        this.getRooms(); // Populate all joinable rooms
      })
      .catch(e => console.log("Error on connecting: ", e));
  }

  getRooms = () => {
    // List all joinable room
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        // Save them on state
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        });
      })
      .catch(e => console.log("Error on joinableRooms:", e));
  };

  subscribeToRoom = roomId => {
    // Clear all message from view before join to room
    this.setState({ messages: [] });

    // Join or subscribe to room that id beem selected
    this.currentUser
      .subscribeToRoom({
        roomId: roomId,
        hooks: {
          // Listen when messages arrived
          onNewMessage: message => {
            // Save them to state
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      })
      // Return Promise
      .then(room => {
        // Save room id
        this.setState({
          roomId: room.id
        });
        // And populate all joinable room
        this.getRooms();
      })
      .catch(e => console.log("Error on subscribing to room: ", e));
  };

  sendMessage = text => {
    // Sending message by current user to active room
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
  };

  createRoom = name => {
    this.currentUser
      .createRoom({
        name
      })
      .then(room => this.subscribeToRoom(room.id))
      .catch(e => console.log("Error while creating new room: ", e));
  };

  render() {
    return (
      <div className="app">
        <RoomList
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
        />
        <MessageList
          roomId={this.state.roomId}
          messages={this.state.messages}
        />
        <SendMessageForm
          disabled={!this.state.roomId}
          sendMessage={this.sendMessage}
        />
        <NewRoomForm createRoom={this.createRoom} />
      </div>
    );
  }
}

export default App;
