const http = require("http");
const express = require("express");
const dotenv = require('dotenv').config()
const mongoose = require("mongoose");
const cors = require("cors");
const socket = require("socket.io");

const mongoDB = process.env.DB;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const userRouter = require("./routes/User.route.js");
const chatRoomRouter = require("./routes/Chatroom.route.js");

const app = express();
const port = process.env.PORT;
app.set("port", port);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use('/users', userRouter);
app.use('/rooms', chatRoomRouter);
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist'
  })
});

const server = http.createServer(app);
server.listen(port, '192.168.0.125');
server.on("listening", () => {
  console.log(`Listening on port:: http://192.168.0.125:${port}/`)
});

const io = socket(server, {
  cors: {
    origin: `http://192.168.0.125:3000`,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  
  socket.on("join-chat", (room) => {
    socket.join(room);
  });

  socket.on("send-msg", (data) => {
    socket.to(data.room).emit("msg-recieve", data);
  });

});
