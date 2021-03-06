const db = require('../config/db');
const Client = db.Client;
const accountService = require('./account.service');
const ClientWithAccount = require('../model/clientWithAccount');

async function getById(id) {
    console.log('Get Client Id ' + id);
    return await Client.findById(id);
}

async function addClient(clientParam) {
    if (await Client.findOne({identityType: clientParam.identityType, identity: clientParam.identity})) {
        throw "Identity: " + clientParam.identityType + " " + clientParam.identity + " already exists";
    }
    const client = new Client(clientParam);
    try {
        const doc = await client.save();
        return doc._doc._id;
    }
    catch(err) {
        throw "Add Client Exception";
    }
}

async function editClient(clientParam) {
    const client = await getById(clientParam._id);
    if (!client) {
        throw "Client is not found";
    }
    Object.assign(client, clientParam);
    try {
        const doc = await client.save();
        return clientParam._id;
    }
    catch(err) {
        throw "Edit Client Exception";
    }
}

async function findClient(query) {
    return await Client.find(query)
}

async function _delete(id) {
    const client = await getById(id);
    if (client) {
        await client.remove();
    }
    return id;
}

async function getClientDetail(id) {
    const client = await getById(id);
    const accounts = await accountService.getAccountsByClientId(id);
    const clientWithAccount = new ClientWithAccount(client, accounts);
    return clientWithAccount;
}

module.exports = {
    addClient,
    editClient,
    findClient,
    getById,
    _delete,
    getClientDetail
}
