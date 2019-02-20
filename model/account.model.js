const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    accountName: {type: String, required: true},
    accountNumber: {type: String, required: true},
    bank: {type: String, required: true},
    clientId: {type: String, required: true}
});

module.exports = mongoose.model('account', schema);
