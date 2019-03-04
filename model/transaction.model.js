const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../config/db');


const schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    birthDate: {type: Date, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    identity: {type: String, required:true},
    receiverBank: {type: String},
    receiverName: {type: String},
    receiverAccount: {type: String},
    receiveAmount: {type: Number, required: true},
    receiveCurrency: {type: String, required: true},
    rate: {type: Number, required: true},
    payAmount: {type: Number, required: true},
    payCurrency: {type: String, required: true},
    fee: {type: Number},
    createDate: {type: Date, default: Date.now}
});
module.exports = mongoose.model('transaction', schema);
