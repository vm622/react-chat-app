import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { IoMdMenu } from "react-icons/io";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { getChatroomConverstionRoute, postMessageRoute } from "../utils/API_routes";

export default function ChatContainer({ currentChatroom, socket, loggedUser, setCollapse }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect( () => {
    async function getConversation(){        
    const user = await JSON.parse(localStorage.getItem("userInfo"));
    const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
    const response = await axios.get(getChatroomConverstionRoute+`${currentChatroom._id}`, config);
    setMessages(response.data.conversation);
    socket.current.emit("join-chat", currentChatroom._id);
    }
    getConversation();
  }, [currentChatroom, socket]);


  const handleSendMsg = async (msg) => {
    const user = await JSON.parse(localStorage.getItem("userInfo"));
    const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
    socket.current.emit("send-msg", {      
      room: currentChatroom._id,
      msg: {
        creator: loggedUser._id,
        postedByUser: [{username: loggedUser.username}],
        message: msg,
      }
    });
    await axios.post(postMessageRoute+`${currentChatroom._id}`, {
      messageText: msg,
    }, config);

    const msgs = [...messages];
    msgs.push({ creator: loggedUser._id, postedByUser: [{username: loggedUser.username}], message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (data) => {
        if(data.room === currentChatroom._id){     //check
          setArrivalMessage(data.msg);
        }
      });
    }
  }, [currentChatroom, socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const changeCollapse = () => {
    setCollapse();
  };

  return (
    <Container>
      <div className="chat-header">
        <div className="chat-details">
          <div className="button-menu" onClick={changeCollapse}>
            <IoMdMenu />
          </div>
          <div className="username">
            <h3>{currentChatroom.name}</h3>
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.creator === loggedUser._id ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <span>{message.postedByUser.map((u) => u.username)}</span>
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />    
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 5% 85% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    padding: 0 0rem;
    background-color: rgb(35, 50, 85);
    .chat-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .username {
        h3 {
          color: white;
        }
      }
      .button-menu {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      font-size: 1.5rem;
      color: white;
      border: none;
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: rgb(45, 60, 120);
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: rgb(45, 60, 120);
        span {
          font-size: 0.75rem;
          font-weight: bold
        }
        p {
          padding: 0px 0rem 0rem 0.6rem
        }
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: rgb(45, 60, 120);
        span {
          font-size: 0.75rem;
          font-weight: bold
        }
        p {
          padding: 0px 0rem 0rem 0.6rem
        }
      }
    }
  }
`;
