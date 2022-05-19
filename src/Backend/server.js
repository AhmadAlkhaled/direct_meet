require('dotenv').config();
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const server = http.createServer(app);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const {uuid} = require('uuidv4');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const validator = require('express-validator');
const pwValidation = require('./middlewares/pwValidator');

// ----------- variables ----------------------------

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000/",
      methods: ["GET", "POST"],
    },
});

const URL_DB = `mongodb+srv://direct:direct@cluster0.9veiu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const port = process.env.PORT || 3000;

// ----------- import files. -----------------------------

const User = require('./model/Usermodel');


// ----------- app.use(). -----------------------------

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

const upload = multer({
    
    limits:
    {
        fileSize: 90000000000
    }
});


// ----------- __________. -----------------------------

const SECRET_TOKEN = 'f638f4354ff089323d1a5f78fd8f63ca';
const signAccessToken = (data) => {
    return jwt.sign(data,SECRET_TOKEN);
}


const createHash = (password) =>
{
    const secret ='Ahmad';
    const hash = crypto.createHmac('sha256', secret).update(password).digest('hex');
    return hash;
}

// ----------- controllers. -----------------------------

app.post('/create/user', pwValidation.passwordValidation,
async  (req, res) => {
    const error = validator.validationResult(req).errors;

    if (error.length > 0)
    {
        return res.status(400).json({
        success: false,
        message: error.map(err => err.msg)
    });
    }

    const { username ,email , password } = req.body;
    console.log(req.body);
    try{
    mongoose.connect(URL_DB);
        const user = new User({
            username:username,
            email:email,
            password: createHash(password) ,
            token:signAccessToken(email)
        });
        const x = await user.save();
        res.status(200).json({
            success: true,
            message:'user created success',
        });

    }catch(err){
        res.status(400).json({
            message:'error in post,"/create/user" ',
            error:err
        });
    };
});


app.post('/login', async  (req, res) => {
    
    const { 
        email,
        password  
        } = req.body;

    try{
     mongoose.connect(URL_DB);
        const email1 = await User.findOne({email:email});
       if(email1.password === createHash(password) )
       {
           res.cookie( "cookie_Token",email1.token,
           {
               httpOnly: true 
           }).status(200).json({
               success: true,
               message:'success login', 
               token:email1.token,
               user:email1
           })
       }else{

            res.clearCookie("cookie_Token").status(200).json({
                success: true,
                message:'password or email is invalid',
                token:'null',
                user:'null'
            })
       }
        
        res.end();
    }catch (err) {
        res.clearCookie("cookie_Token").status(200).json({
            message:'error in post,"/login',
            message:'password or email is invalid',
            token:'null',
            user:'null',
            error:err
        })
    };
});

app.post('/user/update', async (req, res) =>
{
    const { username , email , password , confirmEmail} = req.body;

    if(password === '')
    {
    mongoose.connect(URL_DB);
        const email1 = await User.updateOne({email:confirmEmail},{$set: {username:username,email:email} });
        res.status(200).json({success:true});
        res.end();

    }else{
    mongoose.connect(URL_DB);
        const email1 = await User.updateOne({email:confirmEmail},{$set: {username:username, password:createHash(password),email:email} });
        res.status(200).json({success:true});
        res.end();
    }
    
});

app.post('/user/logout', (req, res) =>
{
    res.clearCookie("cookie_Token")
    .status(200)
    .json({
        success: true,
        message: 'user logged out'
    });
});

app.post('/img',async (req, res)=>{
    const { email } = req.body
 mongoose.connect(URL_DB);
    const img = await User.findOne({email:email});
    res.status(200).send({
            img:img.img
    })
});

app.post('/uploadphoto', upload.single("testImage"), async (req, res) =>
{
    const { buffer , confirmEmail} = req.body;
 mongoose.connect(URL_DB);
    const email1 = await User.updateOne({email:confirmEmail},{$set:{img:buffer} });
    res.status(200).json({success:true});
    res.end();
});


app.post('/DeleteProfilePhoto', async (req, res) => {
    const { Email} = req.body;
  mongoose.connect(URL_DB);
    const email1 = await User.updateOne({email:Email},{$set:{img:''} });
    res.status(200).json({success:true});
    res.end();
});

app.post('/DeleteAccount', async (req, res) => {
    const { Email} = req.body;
 mongoose.connect(URL_DB);
    const email1 = await User.deleteOne({email:Email});
    res.status(200)
    .clearCookie("cookie_Token")
    .json({
        success: true,
        message: 'user logged out'
    });
   
});


app.get('/',  (req, res) => {
    res.status(200).sendFile( path.join(__dirname,'../../dist' , 'index.html'));
});


// app.get('/Meeting', (req, res) => {
//     res.redirect(`/Meeting${uuid()}`);
    
// });

// app.get('/Meeting:room', (req, res) => {
//     console.log('jaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  
    
// });

// ----------- socket. -----------------------------



io.on('connection', (socket )=>{
    
    console.info(`Client connected [id = ${socket.id}]`);

    socket.on('room', (room)=>{
        console.log('user joint to : ' + room );
        socket.join(room);
    });

    socket.on('message', (msg)=>{
        console.log(msg);
        io.sockets.in(msg.RoomName).emit('message', { message: msg.massage,username:msg.username});
    });

    socket.on('disconnect',()=>{
        console.info(`Client gone [id = ${socket.id}]`);
    });

});

// ------------------------------




// ----------- server listening . -----------------------------

server.listen(port,()=>{
    console.log( ` server listening on :  ${port}` );
});

console.log(" verbunden mit DB:" + mongoose.connection.readyState);

console.log(`${pwValidation}`);
