const config = require('./config');
const mongoose = require('mongoose');
mongoose.connect(config.mongoConnetion);

module.exports= {
    User: require('../model/user.model'),
    Client: require('../model/client.model'),
    Account: require('../model/account.model'),
    Transaction: require('../model/transaction.model')
}
