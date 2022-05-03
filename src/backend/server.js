require('dotenv').config();
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const {uuid} = require('uuidv4');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');

import { app } from './controllers/users.js';
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "https://chatt-test.herokuapp.com/",
      methods: ["GET", "POST"],
    },
});

const URL_DB = process.env.DB;
const port = process.env.PORT || 3000;
const SECRET_TOKEN = process.env.SECRET_TOKEN;
const signAccessToken = ( data ) =>
{
    return jwt.sign( data, SECRET_TOKEN );
}

const createHash = ( password ) =>
{
    const secret = process.env.SECRET_KEY;
    const hash = crypto.createHmac('sha256', secret).update(password).digest('hex');
    return hash;
}

const upload = multer({
    
    limits:
    {
        fileSize: 90000000000
    }
});

// ----------- MIDDLEWARE -----------------------------

app.use(cors());
app.use( '/static' ,express.static(path.join(__dirname, '../../dist'), { index: false }));
app.use(bodyParser.urlencoded({ extended: true,limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header
    (
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "*")
    
    next();
});

// ----------- socket. -----------------------------

io.on('connection', (socket ) => 
{
    
    console.info(`Client connected [id = ${socket.id}]`);

    socket.on('room', (room) => 
    {
        console.log('user joint to : ' + room );
        socket.join(room);
    });

    socket.on('message', ( msg ) =>
    {
        console.log(msg);
        io.sockets.in(msg.RoomName).emit('message', { message: msg.massage,username:msg.username});
    });

    socket.on('disconnect',() => 
    
    {
        console.info(`Client gone [id = ${socket.id}]`);
    });

});

// ------------------------------

app.listen(port,()=>{
    console.log( `server listening on ${port}` );
});
