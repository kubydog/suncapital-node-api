const express = require('express');
const router = express.Router();
const transactionService = require('../service/transaction.service');

router.post('/add', add);

function add(req, res, next) {
    transactionService.add(req.body)
        .then( doc => doc? res.json(doc) : res.status(500).json({message: 'Failed to add transaction'}))
        .catch( err => next(err));
}

module.exports = router;
