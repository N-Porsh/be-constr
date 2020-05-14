const createError = require('http-errors');
const userService = require('../services/UserService');
const jwt = require('jsonwebtoken');
const config = require('../../config');

exports.login = async (data) => {
    const user = await userService.getUser(data);
    Reflect.deleteProperty(user, 'password');
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign({user}, config.jwt_refresh_secret);

    return {
        "refreshToken": refreshToken,
        "accessToken": accessToken,
        "userId": user.id
    };
};

function generateAccessToken(user) {
    return jwt.sign({user}, config.jwt_access_secret, {expiresIn: config.jwt_expires_in});
}

exports.refresh = async (data) => {
    const refreshToken = data.token;
    if (refreshToken == null) {
        throw createError(401, "Refresh token not provided");
    }
    //TODO: if you want to revoke token, then store it in redis/db and verify if it exists
    let newAccessToken = null;
    jwt.verify(refreshToken, config.jwt_refresh_secret, (err, data) => {
        if (err) {
            throw createError(403);
        }
        newAccessToken = generateAccessToken({name: data.user.name});
    });

    return {accessToken: newAccessToken};
};

exports.register = (userDTO) => {
    return userService.createUser(userDTO);
};