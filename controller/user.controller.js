const express = require('express');
const router = express.Router();
const userService = require('../service/user.service');

router.post('/register', register);
router.post('/authenticate', authenticate);
router.get('/getUserByToken', getUserByToken);

module.exports = router;

function register(req, res, next) {
    userService.register(req.body)
        .then(() => res.json({}))
        .catch( err => next(err));
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user? res.json(user) : res.status(400).json({message: 'Username or password is incorrect'}))
        .catch(err => next(err));
}

function getUserByToken(req, res, next) {
    userService.getUserbyToken(req.headers['authorization'])
        .then(user => user? res.json(user) : res.status(400).json({message: 'User is not authenicated'}))
        .catch(err =>next(err));
}
