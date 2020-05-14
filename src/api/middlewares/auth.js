const config = require('../../config');
const jwt = require('jsonwebtoken');

const getTokenFromHeader = req => {
    if (
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    ) {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
};

const authenticate = (req, res, next) => {
    const token = getTokenFromHeader(req);
    if (!token) {
        res.sendStatus(401);
        return;
    }

    jwt.verify(token, config.jwt_access_secret, (err, data) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = data.user;
        next();
    });
};

const roleRequired = requiredRole => (req, res, next) => {
    if (req.user.role === requiredRole || req.user.role === 'SUPER_ADMIN') {
        return next();
    } else {
        return res.status(403).send('Action not allowed');
    }
};

module.exports = {
    authenticate,
    roleRequired
}