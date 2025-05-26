const socket = require("socket.io");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    // event handlers
    console.log("connection established");
    socket.on("joinChat", ({ targetUserId, loggedInUserId }) => {
      //   const room = targetUserId + "_" + loggedInUserId;
      const room = [targetUserId, loggedInUserId].sort().join("_");

      console.log({ targetUserId, loggedInUserId, room });
      socket.join(room);
    });

    socket.on("sendMessage", ({ message, targetUserId, loggedInUserId }) => {
      console.log(message, targetUserId, loggedInUserId);
      const room = [targetUserId, loggedInUserId].sort().join("_");
      socket
        .to(room)
        .emit("messageReceived", { targetUserId, loggedInUserId, message });
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
