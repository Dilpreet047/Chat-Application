const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {joinUser, getUser, userLeave, getRoomUsers} = require('./utils/users');

app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));



io.on('connection', (socket) => {
    socket.on('joinRoom', ({username, room}) => {

        const user = joinUser(socket.id, username, room);
        
        socket.join(user.room)

        //Welcome current user
        socket.emit('message', formatMessage('', 'Welcome to Chat Application'));

        //Broadcast when a user join the chat
        socket.broadcast.to(user.room).emit('message', formatMessage('', `${user.username} has joined this room`));

        //Send user and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })

    //Listen for chat message
    socket.on('chatMessage', (chatMessage) => {

        const user = getUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, chatMessage));
    })

    //Runs when client dissconect
    socket.on('disconnect', (disconnect) => {

        const user = userLeave(socket.id);
        if(user){
            io.to(user.room).emit('message', formatMessage('', `${user.username} has left this room`));
        }

        //Send user and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })
})
















const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})
