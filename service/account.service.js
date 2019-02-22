const db = require('../config/db');
const Account = db.Account;

async function getById(id) {
    console.log('Get Account Id ' + id);
    return await Account.findById(id);
}

async function add(accountParams) {
    if (await Account.findOne({accountNumber: accountParams.accountNumber})) {
        throw 'Account Number: ' + accountParams.accountNumber + ' already exists';
    }
    const account = new Account(accountParams);
    try {
        const doc = await account.save();
        return doc;
    }
    catch (err) {
        throw 'Add Account Exception';
    }
}

async function getAccountsByClientId(clientId) {
    return await Account.find({clientId: clientId});
}

async function edit(accountParams) {
    const account = await getById(accountParams._id);
    if (!account) {
        throw 'Account is not found';
    }
    Object.assign(account, accountParams);
    try {
        const doc = await account.save();
        return doc;
    }
    catch (err) {
        throw 'Edit Account Exception';
    }
}

async function _delete(id) {
    const account = await getById(id);
    if (!account) {
        throw 'Account Id is not existed';
    }
    await account.remove();
    return id;
}

module.exports = {
    getById,
    add,
    getAccountsByClientId,
    edit,
    _delete
}
