const express = require('express');
const router = express.Router();
const clientService = require('../service/client.service');

router.post('/add', addClient);
router.put('/edit/:id', editClient);
router.get('/clients', findClient);
router.get('/:id', findClientById);
router.delete('/:id', _delete);

function addClient(req, res, next) {
    clientService.addClient(req.body)
        .then(id => id? res.json({_id: id}) : res.status(500).json({message: 'Failed to add client'}))
        .catch(err => next(err));
}

function editClient(req, res, next) {
    clientService.editClient(req.body)
        .then( id => id? res.json({_id: id}) : res.status(500).json({message: 'Failed to update client'}))
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

function _delete(req, res, next) {
    console.log(req.params.id);
    clientService._delete(req.params.id)
        .then( id => id? res.json({_id: id}) : res.json({_id: ''}))
        .catch( err => next(err))
}

module.exports = router;
