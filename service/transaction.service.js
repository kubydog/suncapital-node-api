const db = require('../config/db');
const Transaction = db.Transaction;

async function add(transactionParams) {
    const transaction = new Transaction(transactionParams);
    transaction.no = generateNo();
    try {
        const doc = await transaction.save();
        return doc;
    }
    catch (err) {
        throw 'Add Transaction Exception';
    }
}

function generateNo() {
    const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let no = '';
    for (let i = 0; i < 8; i ++) {
        let index = Math.ceil(Math.random() * 10);
        no += chars[index - 1];
    }
    return no;
}

async function getById(id) {
    return await Transaction.findById(id);
}

async function findTransactions(query) {
    return await Transaction.find(query);
}

module.exports = {
    add,
    getById,
    findTransactions
}
