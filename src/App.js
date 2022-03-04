import React, { useEffect, useState } from "react";
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
      // another method is to assign axios.get to a variable and setRoom(variavble.data)
      await axios
        .get("https://coded-task-axios-be.herokuapp.com/rooms")
        .then((Response) => {
          const list = Response.data;
          setRooms(list);
        });
    } catch (error) {
      console.error(error);
    }
  };

  // What's going on with useEffect??
  useEffect(() => {
    fetchRooms();
  }, []);

  const createRoom = async (newRoom) => {
    // to do : call BE to create a room
    try {
      const response = await axios.post(
        "https://coded-task-axios-be.herokuapp.com/rooms",
        newRoom
      );
      setRooms([...rooms, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRoom = async (id) => {
    // to do : call BE to delete a room
    try {
      axios.delete(`https://coded-task-axios-be.herokuapp.com/rooms/${id}`);
      setRooms(rooms.filter((room) => room.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const updateRoom = async (updatedRoom) => {
    // to do : call BE to delete a room
    try {
      const response = await axios.put(
        `https://coded-task-axios-be.herokuapp.com/rooms/${updatedRoom.id}`,
        updatedRoom
      );
      const updatedRooms = rooms.map((room) =>
        room.id === updatedRoom.id ? response.data : room
      );
      setRooms(updatedRooms);
    } catch (error) {
      console.error(error);
    }
  };

  // messages are inside an array
  const createMessage = async (id, msg) => {
    try {
      const respone = await axios.post(
        `https://coded-task-axios-be.herokuapp.com/rooms/msg/${id}msg`,
        msg
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="__main">
      <div className="main__chatbody">
        <center>
          <Routes>
            <Route
              path="/room/:roomSlug"
              element={<ChatRoom rooms={rooms} createMessage={createMessage} />}
            />
            <Route
              exact
              path="/"
              element={
                <ChatRoomsList
                  rooms={rooms}
                  createRoom={createRoom}
                  deleteRoom={deleteRoom}
                  updateRoom={updateRoom}
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
