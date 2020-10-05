var express = require('express')
var app =express();
var http =require ('http')
var server = http.createServer(app)

var io = require('socket.io').listen(server)

io.on('connection',(socket)=> {
console.log('socket open')
socket.on('client_new_msg',(data)=> {
    console.log('msg is'+data.msg)

    socket.broadcast.emit('server_new_message',{
        msg:data.msg ,
        user:data.name,
        date: new Date()
    })
})

    socket.on('new_joinee',(data)=>{
        console.log('msg from client - '+data.name)
        console.log('Other Peer id - '+data.room)
        socket.join(data.room);
       // socket.in(data.room).broadcast.emit ('server_new_joinee',{ 
       // socket.broadcast.to(data.room).emit ('server_new_joinee',{ 
            io.in(data.room).emit('server_new_joinee',{   
            //socket.broadcast.emit('server_new_joinee',{
            msg:data.name +'succesfully joined',
            date: new Date()
        })

    })
})

server.listen(3000,()=> {
    console.log("server starts...")
})
