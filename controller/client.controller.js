const express = require('express');
const router = express.Router();
const clientService = require('../service/client.service');

router.post('/add', addClient);
router.put('/:id', editClient);
router.get('/search', findClient);
router.get('/:id', findClientById);

function addClient(req, res, next) {
    clientService.addClient(req.body)
        .then(id => id? res.json({_id: id}) : res.status(500).json({message: 'Failed to add client'}))
        .catch(err => next(err));
}

function editClient(req, res, next) {
    clientService.editClient(req.params.id, req.body)
        .then(doc => doc? res.json(doc) : res.status(500).json({message: 'Failed to update client'}))
        .catch(err => next(err));
}

function findClient(req, res, next) {
    clientService.findClient(req.query)
        .then( docs => res.json(docs))
        .catch(err => next(err));
}

function findClientById(req, res, next) {
    console.log(req.params.id);
    clientService.getById(req.params.id)
        .then( doc => doc? res.json(doc) : res.status(500).json({message: 'Failed to get Client'}))
        .catch( err => next(err));
}

module.exports = router;
