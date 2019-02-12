const db = require('../config/db');
const mongoose = require('mongoose')
const Client = db.Client;

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

async function editClient(id, clientParam) {
    const client = await Client.getById(id);
    if (!client) {
        throw "Client is not found";
    }
    Object.assign(client, clientParam);
    await client.save(function (err, doc) {
        return doc;
    });
}

async function findClient(query) {
    return await Client.find(query)
}

module.exports = {
    addClient,
    editClient,
    findClient,
    getById
}
