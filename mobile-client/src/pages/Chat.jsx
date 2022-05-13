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
  const [menuCollapse, setMenuCollapse] = useState(false);


  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  
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
        <div className={`container ${menuCollapse ? "grid-small" : "grid-big"}`}>
          <Rooms chatrooms={chatrooms} changeChat={handleChatChange} />
          {currentChatroom === undefined ? (
            <Welcome setCollapse={menuIconClick}/>
          ) : (
            <ChatContainer currentChatroom={currentChatroom} socket={socket} loggedUser={currentUser.user} setCollapse={menuIconClick}/>
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
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
  .grid-small {
    grid-template-columns: 0% 100%;
  }
  .grid-big {
    grid-template-columns: 50% 50%;
  }
`;
