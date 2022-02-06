import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import ChatRoomsList from "./components/ChatRoomsList";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

const App = () => {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    try {
      await axios
        .get("https://coded-task-axios-be.herokuapp.com/rooms")
        .then((Response) => {
          const list = Response.data;
          setRooms(list);
        });
    } catch (error) {
      console.log(error);
    }
  };
  fetchRooms();

  const createRoom = async (newRoom) => {
    // to do : call BE to create a room
    try {
      const holdRoom = newRoom;
      await axios
        .post("https://coded-task-axios-be.herokuapp.com/rooms", holdRoom)
        .then((Response) => {
          console.log(Response.status);
          console.log(Response.data);
          // setRooms(...roomsholdRoom);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRoom = async (id) => {
    // to do : call BE to delete a room
    try {
      axios.delete(`https://coded-task-axios-be.herokuapp.com/rooms/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateRoom = async (id) => {
    // to do : call BE to delete a room
    try {
      axios.put("https://coded-task-axios-be.herokuapp.com/rooms/${roomId}");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="__main">
      <div className="main__chatbody">
        <center>
          <Routes>
            <Route
              path="/room/:roomSlug"
              element={<ChatRoom rooms={rooms} />}
            />
            <Route
              exact
              path="/"
              element={
                <ChatRoomsList
                  rooms={rooms}
                  createRoom={createRoom}
                  deleteRoom={deleteRoom}
                />
              }
            />
          </Routes>
        </center>
      </div>
    </div>
  );
};
export default App;
