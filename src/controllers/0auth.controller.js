const { Admin } = require('../models/0auth.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');



const registerAdmin = async (req, res) => {
    const password = req.body.password = bcrypt.hashSync(req.body.password, 10);

    const createuser = new Admin(req.body,password);
    
    createuser.save().then((data) => {
        res.status(200).send({ message: 'success', data });
    }).catch((err) => {
        res.status(400).send({ message: err.message });
    });
}

const loginAdmin = async (req, res) => {

    if (!req.body.email || !req.body.password) return res.status(400).send({ message: 'should not empty filed' })

    const admin = await Admin.findOne({ email: req.body.email })
    if (!admin) return res.status(400).send({ message: 'invalid email address' });

    const comparePass = await bcrypt.compare(req.body.password, admin.password);
    if (comparePass == false) return res.status(400).send({ message: 'invalid password' });

    const id = { _id: admin._id };

    // generate json web token
    var token = jwt.sign(id, process.env.JWT_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRATION_MINUTES });

    return res.status(200).send({ message: 'Login Success!...', data: { token, user: admin } });

}
module.exports = {
    registerAdmin,
    loginAdmin

}