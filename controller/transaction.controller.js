const express = require('express');
const router = express.Router();
const transactionService = require('../service/transaction.service');

router.post('/add', add);
router.get('/transactions', findTransactions);
router.get('/:id', findById);


function add(req, res, next) {
    transactionService.add(req.body)
        .then( doc => doc? res.json(doc) : res.status(500).json({message: 'Failed to add transaction'}))
        .catch( err => next(err));
}

function findById(req, res, next) {
    transactionService.getById(req.params.id)
        .then( doc => doc? res.json(doc) : res.status(500).json({message: 'Failed to get transaction detail'}))
        .catch( err => next(err));
}

function findTransactions(req, res, next) {
    transactionService.findTransactions(req.query)
        .then( docs => docs? res.json(docs): res.status(500).json({message: 'Failed to find transactions'}))
        .catch( err => next(err));
}

module.exports = router;
