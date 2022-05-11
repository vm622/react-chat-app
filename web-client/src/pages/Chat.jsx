import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { getUserChatroomsRoute, endpoint } from "../utils/API_routes";
import ChatContainer from "../components/ChatContainer";
import Rooms from "../components/Rooms";
import Welcome from "../components/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [chatrooms, setChatrooms] = useState([]);
  const [currentChatroom, setCurrentChatroom] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  
  useEffect(async () => {
    if (!localStorage.getItem("userInfo")) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem("userInfo")
        )
      );
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(endpoint);
    }
  }, [currentUser]);

  useEffect(async () => {
    if (currentUser) {
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      };
      const data = await axios.get(`${getUserChatroomsRoute}`, config);
      setChatrooms(data.data.userChatrooms);
    }
  }, [currentUser]);

  const handleChatChange = (chatroom) => {
    setCurrentChatroom(chatroom);
  };


  return (
    <>
      <Container>
        <div className="container">
          <Rooms chatrooms={chatrooms} changeChat={handleChatChange} />
          {currentChatroom === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChatroom={currentChatroom} socket={socket} loggedUser={currentUser.user}/>
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 100vh;
    width: 100vw;
    background-color: rgb(74, 88, 110);
    display: grid;
    grid-template-columns: 22% 78%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
