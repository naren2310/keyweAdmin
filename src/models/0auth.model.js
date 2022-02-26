const  mongoose = require('mongoose');
const { validateEmail, validatepassword } = require('../customValidation/regex.validation');

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,'name is required'],
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        required: [true,'email is required'],
    },
    password: {
        type: String,
        validate: [validatepassword, 'Please fill a valid email password']
    },
    role: {
        type: String,
        default: "Admin",

    }
}, { timestamps: true })


const Admin = mongoose.model('admin', adminSchema);

module.exports = {
    Admin
}