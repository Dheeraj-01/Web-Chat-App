const socket = io('http://localhost:8000')


const form = document.getElementById('send-container');
// console.log(form);
const messageInput = document.getElementById('messageInp')
// console.log(messageInput);
const messagecontainer = document.querySelector('.box')
var  audio = new Audio('alert.mp3');


const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('background-message')
    messageElement.classList.add(position)
    // console.log(messageElement);
    messagecontainer.append(messageElement);
    if(position == 'leftFloat'){
        audio.play();
    }
    
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    // console.log(message);
    append(`You: ${message}`,"rightFloat");
    socket.emit('send',message);
    messageInput.value = "";
})

const name = prompt('Enter your name to Join')
socket.emit('new-user-join',name);

socket.on('user-joined', name=>{
    append(`${name} joined the chat`,'leftFloat');
});

socket.on('receive',data=>{
    // console.log(data); 
    append(`${data.name}: ${data.message}`,"leftFloat")
})

