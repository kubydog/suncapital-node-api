const expressjwt = require('express-jwt');
const config = require('./config');
const userService = require('./user/user.service');

function jwt() {
    const secret = config.secret;
    return expressjwt({secret, isRevoked}).unless({
        path: [
            '/user/authenticate',
            '/user/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = userService.getById(payload.sub);
    if (!user) {
        return done(null, true);
    }
    done();
}

module.exports = jwt;
