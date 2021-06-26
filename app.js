//package.json   we are able to use node_modules from other files
const express=require('express')
const app=express()
const http = require('http');
const server = http.createServer(app);
const {Server}=require("socket.io")
const io=new Server(server)

app.use(express.static("public"))
let userList=[]

io.on("connection",function(socket){

socket.on("userConnected",(username)=>{
    let userObj={id:socket.id,user:username}
   
    userList.push(userObj)
    socket.broadcast.emit("join",userObj)
    socket.broadcast.emit("onlineJoin",userList);
    
})

socket.on("disconnect",function(){
    let user;
    let leftUser={};
    
    let rem=userList.filter(e=>{
        if(socket.id==e.id)
        {
            leftUser=e;
            user=e.user;
        return false;}
        else return true;
    })
    userList=rem;
    socket.broadcast.emit("userLeft",leftUser)
})

socket.on("chatMsg",function(chatObj){
socket.broadcast.emit("chat",chatObj);
})

})


let port=process.env.port||3000


server.listen(port,function(){
    console.log("Server started on 5500");
})

