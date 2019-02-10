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

module.exports = {
    getById,
    register
}


