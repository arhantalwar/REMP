const http = require('http')
const express = require('express')
const socket = require('socket.io')
const cors = require('cors')

const app = express()
const server = http.createServer(app)
const io = socket(server)

const corsOptions = {
  origin: 'http://localhost:3000/',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));


const clients = []

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/muu", (req, res) => {
    res.sendFile(__dirname + "/muu.html")
})

app.get("/shakeitoff.mp3", (req, res) => {
    res.sendFile(__dirname + "/shakeitoff.mp3")
})

app.get("/root", (req, res) => {
    res.sendFile(__dirname + "/root.html")
})

io.on("connection", (socket) => {

    clients.push(socket.id)
    console.log(clients)

    socket.on('playMe', (num) => {
        io.emit('played', num)
    })

    socket.on("disconnect", (socket) => { 
        clients.splice(clients.indexOf(socket) - 1, 1);
        console.log(clients)
    })

})

server.listen(3000)
