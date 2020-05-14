const validator = require('../../utils/validator');
const service = require('../services/ResponsibleService');

exports.getAllResponsibles = async (req, res) => {
    const users = await service.getAllResponsibleUsers(req.query);
    await res.json({status: 'success', data: users});
};

exports.addResponsible = async (req, res) => {
    const validate = validator('responsible_person');
    const isValid = validate(req.body);
    if (!isValid) {
        return await res.status(400).json({status: 'fail', error: validate.errors});
    }

    try {
        const responsible = await service.addResponsiblePerson(req.body);
        await res.status(201).json({status: 'success', data: responsible});
    } catch (e) {
        return await res.status(409).json({status: 'fail', error: e.message});
    }
};