const http = require('http');
const socketIO = require('socket.io');

let io;

const userSocketMap = new Map();

const connectSocket = (app) => {
  const server = http.createServer(app);
  io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('A user connected', socket.id);
    const userID = socket.handshake.query.userID; 
    userSocketMap.set(userID, socket.id);

    socket.on('disconnect', () => {
      console.log('User disconnected', socket.id);
      userSocketMap.delete(userID);
    });
  });

  return server;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};

module.exports = { connectSocket, getIO, userSocketMap };
