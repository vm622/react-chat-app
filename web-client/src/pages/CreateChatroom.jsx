import React, { useState} from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createChatroomRoute } from "../utils/API_routes";

export default function CreateChatroom() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    name: "",
    members: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = await JSON.parse(localStorage.getItem("userInfo"));
    const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
    const { name, members } = values;
    const { data } = await axios.post(createChatroomRoute, {
      name: name,
      members: members.split(', ')
    }, config);

    if (data.success === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.success === true) {
      navigate("/");
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>React Chat App</h1>
          </div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="Members"
            name="members"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create Chatroom</button>
          <span>
            <Link to="/">Return</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: rgb(54, 69, 90);
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: rgb(35, 50, 80);
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: rgb(50, 10, 195);
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: rgb(48, 0, 175);
    }
  }
  span {
    text-align: center;
    color: white;
    text-transform: uppercase;
    a {
      color: white;
      text-decoration: none;
      font-weight: bold;
      &:hover {
        color: rgb(48, 0, 175);
      }
    }
  }
`;
