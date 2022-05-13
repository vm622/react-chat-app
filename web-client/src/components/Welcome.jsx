import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoMdMenu } from "react-icons/io";

export default function Welcome({setCollapse}) {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem("userInfo")
      ).user.username
    );
  }, []);

    const changeCollapse = () => {
        setCollapse();
    };

  return (
    <Container>
      <div className="button-menu" onClick={changeCollapse}>
        <IoMdMenu />
      </div>
      <div className="text">
        <h1>Welcome, <span>{userName}!</span></h1>
        <h3>Select chatroom to start messaging.</h3>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 5% 95%;
  gap: 0.1rem;
  .button-menu {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: start;
      align-items: flex-start;
      font-size: 1.5rem;
      color: white;
      border: none;
  }
  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: column;
  }
  span {
    color: rgb(0, 40, 100);
  }
`;
