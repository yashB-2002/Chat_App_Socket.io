# Chat_App_Socket.io

This is a chat application which supports multiuser chatting at the same time.

This is made using Socket.IO as Socket.IO enables real-time bidirectional event-based communication.It consists of:

- a Node.js server (this repository)

- a Javascript client library for the browser (or a Node.js client)

# Sample code:

    io.on('connection', socket => {
    
    socket.emit('request', /* … */); // emit an event to the socket
  
    io.emit('broadcast', /* … */); // emit an event to all connected sockets
  
    socket.on('reply', () => { /* … */ }); // listen to the event

    });
    
# Installation
  // with npm
  
  npm install socket.io

  // with yarn
  
  yarn add socket.io

# How to use
  The following example attaches socket.io to a plain Node.JS HTTP server listening on port 3000.
  
    const server = require('http').createServer();
  
    const io = require('socket.io')(server);
  
    io.on('connection', client => {
  
    client.on('event', data => { /* … */ });
  
    client.on('disconnect', () => { /* … */ });
  
    });
  
    server.listen(3000);
  

  
