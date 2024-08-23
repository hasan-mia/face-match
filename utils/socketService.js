const { getIO, userSocketMap } = require("../config/socket");

const sendMessage = (event, data) => {
  const io = getIO();
  io.emit(event, { message: data });
};

const sendMessageToUser = (userID, event, data) => {
  const io = getIO();
  const socketId = userSocketMap.get(userID);

  if (socketId) {
    io.to(socketId).emit(event, { message: data });
  } else {
    console.error(`User with ID ${userID} not connected.`);
  }
};


module.exports = { sendMessage, sendMessageToUser };