var io = require('socket.io')(8000);
const users = {};
io.on('connection',socket=>{
    socket.on('new-user-join',name=>{
        // console.log("user name ",name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message : message,name : users[socket.id]});
    });
})