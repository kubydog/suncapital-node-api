const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    isAdmin: {type: Boolean, required: true},
    createDate: {type: Date, default: Date.now()},
    updateDate: {type: Date}
});

module.exports = mongoose.model('User', schema);




