import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import Logout from "./Logout";

export default function Rooms({ chatrooms, changeChat }) {
  const navigate = useNavigate();
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem("userInfo")
    );
    setCurrentUserName(data.user.username);
  }, []);

  const changeCurrentChat = (index, chatroom) => {
    setCurrentSelected(index);
    changeChat(chatroom);
  };


  return (
    <> 
      <Container>
        <div className="brand">
          <h3>Channels</h3>
        </div>
        <div className="chatrooms">
          <div className="chatroom"
          onClick={() => navigate("/createChatroom")}
          >
            <Link to="/createChatroom"></Link>
            <div className="username">
              <h3>Create Chatroom</h3>
            </div>
          </div>
          {chatrooms.map((chatroom, index) => {
            return (
              <div
                key={chatroom._id}
                className={`chatroom ${
                    index === currentSelected ? "selected" : ""
                  }`}
                onClick={() => changeCurrentChat(index, chatroom)}
              >
                <div className="username">
                  <h3>{chatroom.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="current-user">
          <div className="username">
            <h2>{currentUserName} </h2>
          </div>
          <Logout />
        </div>
      </Container>
    </>
  );
}


const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  overflow: hidden;
  background-color: rgb(54, 69, 90);
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    h3 {
      color: white;
    }
  }
  .chatrooms {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: rgb(112, 128, 144);
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .chatroom {
      background-color: rgb(112, 128, 144);
      min-height: 4rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: center;
      transition: 0.5s ease-in-out;
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: rgb(112, 128, 174);
    }
  }

  .current-user {
    background-color: rgb(35, 50, 80);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;