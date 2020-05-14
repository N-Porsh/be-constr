const validator = require('../../utils/validator');
const service = require('../services/ObservationService');

exports.getActiveObservationTypes = async (req, res) => {
    const observationTypes = await service.getActiveObservationTypes();
    await res.json({status: 'success', data: observationTypes});
};

exports.addObservationType = async (req, res) => {
    const validate = validator('observation_type');
    const isValid = validate(req.body);
    if (!isValid) {
        return await res.status(400).json({status: 'fail', error: validate.errors});
    }

    const responsible = await service.addObservationType(req.body);
    await res.status(201).json({status: 'success', data: responsible});
};