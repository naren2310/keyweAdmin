const mongoose = require('mongoose');
const { validateEmail, validatepassword } = require('../customValidation/regex.validation');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'username is required'],
        unique: true,
    },//user filed should be required 
    email: {
        type: String,
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        required: [true, 'email is required'],
    },// email filed should be required 
    password: {
        type: String,
        validate: [validatepassword, 'Please fill a valid email password']
    },//password filed should be required 
    role: {
        type: String,
        default: "buyer",
        enum: ["admin", "buyer", "seller", "agent"]
    }// role filed default buyer and othen then enum only 
}, { timestamps: true })



const User = mongoose.model('user', userSchema);

module.exports = {
    User
}