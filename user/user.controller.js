const express = require('express');
const router = express.Router();
const userService = require('./user.service');

router.post('/register', register);

module.exports = router;

function register(req, res, next) {
    userService.register(req.body)
        .then(() => res.json({}))
        .catch( err => next(err));
}


