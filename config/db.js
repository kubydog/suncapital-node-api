const config = require('./config');
const mongoose = require('mongoose');
mongoose.connect(config.mongoConnetion);

module.exports= {
    User: require('../model/user.model')
}
