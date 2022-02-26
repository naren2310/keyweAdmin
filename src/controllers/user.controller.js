const { User } = require('../models/user.model');

const addUser = async (req, res) => {
    
    const createuser = new User(req.body);

    createuser.save().then((data) => {
        res.status(200).send({ message: 'success', data });
    }).catch((err) => {
        res.status(400).send({ message: err.message });
    });
}

const getAllUsers = async (req, res) => {

    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    const page = req.query.page ? (parseInt(req.query.page) - 1) * limit : 0;

    var result = { userName: { $regex: req.query.userName ? req.query.userName : '', $options: 'i' } };

    const getUsers = await User.find(result).limit(limit).skip(page);

    const count = await User.countDocuments(result);

    res.status(200).send({ message: 'Data retrieve success!..', count: count, data: getUsers });

}

const getUser = async (req,res)=>{

    if (!req.body._id) return res.status(400).send({ message: "id is required" })

    const user = await User.findById(req.body._id);

    if (!user) return res.status(400).send({ message: "invalid user" });

    const users = await User.findById(req.body._id);return res.status(400).send({ message: "user reterive success",data: users });

}
const updateUser = async (req, res) => {

    const payload = req.body;

    if (!req.query._id) return res.status(400).send({ message: "id is required" })

    const user = await User.findById(req.query._id);

    if (!user) return res.status(400).send({ message: "invalid user" });


    const result = await User.findByIdAndUpdate(user._id, payload);

    const users = await User.findById(req.query._id);

    return res.status(200).send({ message: "updated success!..", data: users })

}

const deleteUser = async (req, res) => {

    if (!req.query._id) return res.status(400).send({ message: "id is required" });

    const user = await User.findByIdAndDelete(req.query._id);

    if (!user) return res.status(400).send({ message: "invalid user" });

    const users = await User.findByIdAndDelete(req.query._id);

    return res.status(200).send({ message: "deleted success!..", data: user });

}


module.exports = {
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser

}