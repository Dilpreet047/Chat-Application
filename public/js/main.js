const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userNames = document.getElementById('users');
const leaveButton = document.getElementById('leave-btn');
const clearChatButton = document.getElementById('clear-chat-btn');


//Get user from URL
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})


const socket = io();
//Remove user after Leave Button
leaveButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = './index.html';
});


//Join chatroom
socket.emit('joinRoom', {username, room});

//get room and users
socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room);
    outputUsers(users);
})

socket.on('message', (message) => {
    //console.log(message); //this is visible in client side console(Browser)
    let roomChats;
    if(message.username === 'Welcome'){
    
        if(localStorage.getItem(room) === null){
            roomChats = [];
        }
        else{
            roomChats = JSON.parse(localStorage.getItem(room));
        }

        for (let index = 0; index < roomChats.length; index++) {
            outputMessage(roomChats[index]);
            
        }

    }
    
    else if(message.username !== ''){

        if(localStorage.getItem(room) === null){
            roomChats = [];
        }
        else{
            roomChats = JSON.parse(localStorage.getItem(room));
        }
        
        roomChats.push(message);
        localStorage.setItem(room, JSON.stringify(roomChats));
    }

    outputMessage(message);

    //Scroll down for new chat
    chatMessages.scrollTop = chatMessages.scrollHeight;

});

//Clear all the chats from local storage
clearChatButton.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem(room);
    location.reload();
})


chatForm.addEventListener('submit', (e) => {

    e.preventDefault()

    //Get message text
    const mes = e.target.elements.msg.value;
    //Emitting a message to server(Payload)
    socket.emit('chatMessage', mes);

    //Clear the text area
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus(); 
})

function outputMessage(message){

    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta" > ${message.username} <span> ${message.time} </span></p> 
                     <p class="text"> ${message.text} </p>`
    document.querySelector('.chat-messages').appendChild(div);
}

//Add room name to dom
function outputRoomName(room){
    roomName.innerText = room;
}

//Add user names to dom
function outputUsers(users){
    userNames.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}

