const validator = require('../../utils/validator');
const service = require('../services/ObjectService');

exports.getActiveObjects = async (req, res) => {
    const objects = await service.getAllObjects();
    await res.json({status: 'success', data: objects});
};

exports.getOneObject = async (req, res) => {
    const object = await service.getObject(req.params.id);
    await res.json({status: 'success', data: object});
};

exports.addObject = async (req, res) => {
    const validate = validator('object');
    const isValid = validate(req.body);
    if (!isValid) {
        return await res.status(400).json({status: 'fail', error: validate.errors});
    }

    const object = await service.createObject(req.body);
    await res.status(201).json({status: 'success', data: object});
};