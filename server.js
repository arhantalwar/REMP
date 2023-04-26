const http = require('http')
const express = require('express')
const socket = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socket(server)

const clients = []

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/root", (req, res) => {
    res.sendFile(__dirname + "/root.html")
})

io.on("connection", (socket) => {
    clients.push(socket.id)
    console.log(clients)

    socket.on('playMe', (num) => {
        //console.log(num)
        io.emit('played', num)
    })

    socket.on("disconnect", (socket) => { 
        clients.splice(clients.indexOf(socket) - 1, 1);
        console.log(clients)
    })
})


server.listen(3000)
