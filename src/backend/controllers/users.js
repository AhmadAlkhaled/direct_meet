const router = express.Router();
const mongoose = require('mongoose');
const crypto = require('crypto');

const User = require('../models/user')

app.post('/create/user', async  (req, res) => {
    const { username ,email , password } = req.body;
    console.log(req.body);
    try{
        mongoose.connect(URL_DB);
        const user = new User({
            username: username,
            email: email,
            password: createHash(password) ,
            token: signAccessToken(email)
        });
        const x = await user.save();
        res.status(200).json({
            success: true,
            message: 'user created success',
        });

    }catch(err){
        res.status(400).json({
            message: 'error in post,"/create/user" ',
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
                message: 'password or email is invalid',
                token: 'null',
                user: 'null'
            })
       }
        
        res.end();
    }catch (err) {
        res.clearCookie("cookie_Token").status(200).json({
            message: 'error in post," /login " ',
            message: 'password or email is invalid',
            token: 'null',
            user: 'null',
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
 
    const { buffer, originalname, mimetype , confirmEmail} = req.body;
    
    mongoose.connect(URL_DB);
    
    const newImage = new Image();
    newImage.data = buffer;
    newImage.name = Date.now() + "-" + originalname;
    newImage.contentType = mimetype;
    
    const email1 = await User.updateOne({email:confirmEmail},{$set:{img:buffer} });

    res.status(200).json({success:true});
    res.end();
});


app.get('/images/:name', (req, res) =>
{
    
    Image.findOne({ name: req.params.name }).then(image =>
    {
        
        if(image)
        {
            console.log(image);

            res.status(200)
                .contentType(image.contentType)
                .send(image.data);
        }
        else
        {
            res.status(404).send("Image not found!");
        }
    });
});

app.get('/', (req, res) => {
    res.status(200).sendFile( path.join(__dirname,'../../dist' , 'index.html'));
});

app.get('/Meeting-room', (req, res) => {
    res.redirect(`/Meeting-room/${uuid()}`);
    
});

app.get('/Meeting-room/:room', (req, res) => {
  
    res.send( { roomName: req.params.room })
});

// mongoose.connection.close();

export { app }