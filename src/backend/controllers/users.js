const router = express.Router();
const mongoose = require('mongoose');
const crypto = require('crypto');
const User = require('../models/user')


exports.userPost = async  (req, res) => {
    const { username ,email , password } = req.body;
    try
    {
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

    }
    catch(err)
    {
        res.status(400).json({
            message:'error in post,"/create/user" ',
            error:err
        });
    };
}

exports.userLogin = async  (req, res) => {
    
    const { email, password } = req.body;

    try
    {
       mongoose.connect(URL_DB);
        const email1 = await User.findOne({ email:email });
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
       }
       else
       {
            res.clearCookie("cookie_Token").status(200).json({
                success: true,
                message:'password or email is invalid',
                token:'null',
                user:'null'
            })
       }     
        res.end();
    }
    catch (err)
    {
        res.clearCookie("cookie_Token").status(200).json({
            message:'error in post,"/login',
            message:'password or email is invalid',
            token:'null',
            user:'null',
            error:err
        })
    };
}

exports.userUpdate = async (req, res) =>
{
    const { username , email , password , confirmEmail} = req.body;

    if(password === '')
    {
        mongoose.connect(URL_DB);
        const email1 = await User.updateOne({email:confirmEmail},{$set: {username:username,email:email} });
        res.status(200).json({success:true});
        res.end();

    }
    else
    {
        mongoose.connect(URL_DB);
        const email1 = await User.updateOne({email:confirmEmail},{$set: {username:username, password:createHash(password),email:email} });
        res.status(200).json({success:true});
        res.end();
    }
}

exports.userLogout = (req, res) =>
{
    res.clearCookie("cookie_Token")
    .status(200)
    .json({
        success: true,
        message: 'user logged out'
    });
}

exports.userDelete = (req, res) =>
{
    const mongoId = mongoose.isValidObjectId(req.params.id);
    if (!mongoId)
        return res.status(400).send('wrong Id');
    const userDeleted =  await User.findByIdAndDelete(req.params.id);
    if (!userDeleted) 
        return res.status(404).send('wrong Id');
    res.status(200).send(`user with id ${req.params.id} deleted!`);
}

mongoose.connection.close();
