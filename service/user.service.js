const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
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
        };
    }
}

async function getUserbyToken(token) {
    console.log("authorization: " + token);
    console.log("Toke: " + token.slice(7));
    const _id = jwt.decode(token.slice(7), config.secret);
    console.log('_id: ' + _id);
    if (_id) {
        return await getById(_id.sub);
    }
    throw "Token: " + token + "is invalid";
}

async function getUserById(_id) {
    const user = await User.findOne({_id: _id});
    if (user) {
        const { password, createDate, ...userDetails } = user.toObject();
        return { ...userDetails };
    }
}

module.exports = {
    getById,
    register,
    authenticate,
    getUserbyToken
}


