const express = require('express');
const http = require('http');
const cors = require('cors');
require('./connection');  // Assuming this sets up the MongoDB connection

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');

// Setting up Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  },
});

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mounting user routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Starting the server
server.listen(8080, () => {
  console.log('Server running at port', 8080);
});
