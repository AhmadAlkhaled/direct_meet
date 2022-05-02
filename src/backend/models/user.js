const { Schema, model } = require('mongoose');

const user = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    token: String,
    userImage: Object
}, { timestamps: true });

const userModel = new model('user', user, 'users');

module.exports = userModel;
