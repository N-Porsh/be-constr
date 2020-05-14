const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const userModel = require('../models/UserModel');


function verifyPassword(userPassword, inputPassword) {
    userPassword = userPassword.toString();
    const isValid = bcrypt.compareSync(inputPassword, userPassword);
    if (!isValid) {
        throw createError(403, "Incorrect credentials");
    }
}

exports.getUserByEmail = async (email) => {
    const {rows} = await userModel.findByEmail(email);
    return rows[0];
};

exports.getUser = async (data) => {
    const user = await this.getUserByEmail(data.email);
    if (!user) {
        throw createError(401, "User not found");
    }

    verifyPassword(user.password, data.password);
    return user;
};

exports.createUser = async (userDTO) => {
    return await userModel.create(userDTO);
};