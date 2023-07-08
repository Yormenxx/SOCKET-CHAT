
const express = require("express");

const app = express();

const path = require("path")

const logger = require("morgan")

//SETTINGS

app.set("port",3000);

//MIDDLEWARES


app.use(logger("dev"));



//STATICS

app.use(express.static(path.join(__dirname, "public")))

//ERRORS

app.use((req,res,next)=>{
    res.status(404).send("Server has a error check it out please")
})

//SERVER

const server =app.listen(app.get("port"),()=>{
    console.log("server on port ", app.get("port"))
})

const socketio =require("socket.io")
const io = socketio(server)


io.on("connection",(socket)=>{


    console.log("nueva conexion",socket.id)

    socket.on("messages",(msg)=>{

        socket.broadcast.emit("messages",msg)
        // console.log(msg)
    })

    socket.on("Users",(usr)=>{
        io.sockets.emit("Users",usr)
        console.log(usr , "Ingreso un nuevo usuario")
    })

    
    socket.on("exitUsers",(usrLeave)=>{
        io.sockets.emit("exitUsers",usrLeave)
        console.log(usrLeave , "Se fue un usuario")
    })

    socket.on("typing",(userName)=>{
        socket.broadcast.emit("typing",userName)
    })

   
})



