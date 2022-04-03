const http = require("http");
const express = require("express");
const dotenv = require('dotenv').config()
const mongoose = require("mongoose");

const mongoDB = 'mongodb://127.0.0.1/chat_v0-1';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const userRouter = require("./routes/User.route.js");
const chatRoomRouter = require("./routes/Chatroom.route.js");

const app = express();
const port = process.env.PORT;
app.set("port", port);

app.use(express.json());
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
server.listen(port);
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
});
