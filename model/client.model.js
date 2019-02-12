const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    chineseName: {type: String},
    birthDate: {type: Date, required: true},
    mobile: {type: String, required: true},
    address: {type: String, required: true},
    suburb: {type: String, required: true},
    state: {type: String, required: true},
    postCode: {type: String, required: true},
    identityType: {type: String, required: true},
    identity: {type: String, required:true},
    identityExpireDate: {type: Date, required:true}
});

module.exports = mongoose.model('client', schema);
