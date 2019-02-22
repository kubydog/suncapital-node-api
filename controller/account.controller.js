const express = require('express');
const router = express.Router();
const accountService = require('../service/account.service');

router.post('/add', add);
router.get('/:clientId', getAccountsByClientId);
router.put('/:id', edit);

function add(req, res, next) {
    accountService.add(req.body)
        .then( doc => doc? res.json(doc) : res.status(500).json({message: 'Failed to add account'}))
        .catch( err => next(err));
}

function getAccountsByClientId(req, res, next) {
    accountService.getAccountsByClientId(req.params.clientId)
        .then( docs => docs? res.json(docs) : res.status(500).json({message: 'Failed to get accounts by client id'}))
        .catch( err => next(err));
}

function edit(req, res, next) {
    accountService.edit(req.body)
        .then( doc => doc? res.json(doc) : res.status(500).json({message: 'Failed to edit account'}))
        .catch( err => next(err));
}

module.exports = router;
