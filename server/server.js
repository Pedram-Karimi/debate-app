const { Server } = require("socket.io");
const { createServer } = require("node:http");
const express = require("express");

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("connect");
  socket.on("chat message", (message) => {
    console.log(message);
    io.emit("chat message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3001, () => {
  console.log("server running at http://localhost:3001");
});
