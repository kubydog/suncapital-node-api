const config = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');
const User = db.User;

async function getById(id) {
    return await User.findById(id).select('-password');
}

async function register(user) {
    if (await User.findOne({ email: user.email })) {
        throw "Email: " + user.email + " is already registered";
    }

    const newUser = new User(user);
    if (user.password) {
        newUser.password = bcrypt.hashSync(user.password, 10);
    }

    await newUser.save();
}

async function authenticate({email, password}) {
    const user = await User.findOne({ email: email });
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({sub: user._id}, config.secret);
        const { password, ...userWithoutPassword} = user.toObject();
        return {
            ...userWithoutPassword,
            token
        }
    }
}

module.exports = {
    getById,
    register,
    authenticate
}


