const express = require('express');
app = express();
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {joinUser, getUser, userLeave, getRoomUsers} = require('./utils/users');
const mongoose = require('mongoose');
require('dotenv/config')
app.use(express.json())


const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

const proutes = require('./router/route');
app.use('/data', proutes);

mongoose.connect(process.env.DB_connect, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Connected to DB')
})


io.on('connection', (socket) => {
    socket.on('joinRoom', ({username, room}) => {

        const user = joinUser(socket.id, username, room);
        
        socket.join(user.room)
        
        //Welcome current user
        socket.emit('message', formatMessage('Welcome', 'Welcome to Chat Application', user.room));

        //Broadcast when a user join the chat
        socket.broadcast.to(user.room).emit('message', formatMessage('', `${user.username} has joined this room`, user.room));

        //Send user and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })

    //Listen for chat message
    socket.on('chatMessage', (chatMessage) => {

        const user = getUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, chatMessage, user.room));
    })

    //Runs when client dissconect
    socket.on('disconnect', (disconnect) => {

        const user = userLeave(socket.id);
        if(user){
            io.to(user.room).emit('message', formatMessage('', `${user.username} has left this room`), user.room);
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }

        //Send user and room info
        
    })
})









const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})

