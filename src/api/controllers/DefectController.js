const validator = require('../../utils/validator');
const service = require('../services/DefectService');

exports.getAllDefects = async (req, res) => {
    const defects = await service.getAllDefects(req.query);
    await res.json({status: 'success', data: defects});
};

exports.updateDefect = async (req, res) => {
    const validate = validator('UpdateDefect');
    const isValid = validate(req.body);
    if (!isValid) {
        return await res.status(400).json({status: 'fail', error: validate.errors});
    }

    try {
        const defect = await service.updateDefect(req.params.id, req.body);
        await res.status(200).json({status: 'success', data: defect});
    } catch (e) {
        return await res.status(404).json({status: 'fail', error: e.message});
    }
};