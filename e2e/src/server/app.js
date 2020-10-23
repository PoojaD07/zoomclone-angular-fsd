
var express = require('express')
var app =express();
var http =require ('http')
var server = http.createServer(app) 
var io = require('socket.io').listen(server)
io.on('connection',(socket)=> {
    console.log('socket open')

socket.on('client_new_msg',(data)=> {
    console.log('msg is :'+data.msg)

    socket.in(data.room).broadcast.emit('server_new_message',{
        msg:data.msg ,
        user:data.name,
        date: new Date()
    })
})

    socket.on('new_joinee',(data)=>{
        console.log('name of client '+data.name)
        console.log('room of client '+data.room)

        socket.join(data.room);
socket.in(data.room).broadcast.emit('server_new_joinee',{   //----------it is used for only 1 room
        //socket.broadcast.emit('server_new_joinee',{
            msg:data.name +' succesfully joined in room '+data.room,
            date: new Date()
        })

    })
}) 


server.listen(3000,()=> {
    console.log("server starts...")
}) 


 //console.log("server starts...")