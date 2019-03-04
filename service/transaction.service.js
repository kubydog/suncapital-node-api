const db = require('../config/db');
const Transaction = db.Transaction;

async function add(transactionParams) {
    const transaction = new Transaction(transactionParams);
    try {
        const doc = await transaction.save();
        return doc;
    }
    catch (err) {
        throw 'Add Transaction Exception';
    }
}

module.exports = {
    add
}
