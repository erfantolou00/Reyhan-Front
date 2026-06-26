import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import fs from 'fs';
import path from 'path';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Create messages directory if it doesn't exist
const messagesDir = path.join(process.cwd(), 'messages');
if (!fs.existsSync(messagesDir)) {
  fs.mkdirSync(messagesDir);
}

// Function to save message to file
const saveMessage = (message) => {
  const timestamp = new Date().toISOString();
  const messageData = {
    message,
    timestamp
  };
  
  const filePath = path.join(messagesDir, 'messages.json');
  let messages = [];
  
  // Read existing messages if file exists
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    messages = JSON.parse(fileContent);
  }
  
  // Add new message
  messages.push(messageData);
  
  // Save updated messages
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
};

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (message) => {
    console.log('received:', message);
    // Save message to file
    saveMessage(message);
    // Broadcast the message to all connected clients
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'salam erfan jan' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}