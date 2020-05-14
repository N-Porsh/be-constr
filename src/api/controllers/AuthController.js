const validator = require('../../utils/validator');
const authService = require('../services/AuthService');

exports.login = async (req, res) => {
    const validate = validator('auth');
    const isValid = validate(req.body);
    if (!isValid) {
        return await res.status(400).json({status: 'fail', error: validate.errors});
    }

    try {
        const result = await authService.login(req.body);
        await res.status(200).json({status: 'success', data: result});
    } catch (e) {
        return await res.status(e.statusCode).json({status: 'fail', error: e.message});
    }
}

exports.register = async (req, res) => {
    const validate = validator('user');
    const isValid = validate(req.body);
    if (!isValid) {
        return await res.status(400).json({status: 'fail', error: validate.errors});
    }

    const user = await authService.register(req.body);
    await res.status(201).json({status: 'success', data: user});
}

exports.refreshToken = async (req, res) => {
    const validate = validator('token');
    const isValid = validate(req.body);
    if (!isValid) {
        return await res.status(400).json({status: 'fail', error: validate.errors});
    }

    try {
        const result = await authService.refresh(req.body);
        await res.status(200).json({status: 'success', data: result});
    } catch (e) {
        return await res.status(e.statusCode).json({status: 'fail', error: e.message});
    }
}