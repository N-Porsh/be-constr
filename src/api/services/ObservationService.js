const observationTypeModel = require('../models/ObservationTypeModel');

exports.getActiveObservationTypes = async () => {
    return await observationTypeModel.findAllActive();
};

exports.addObservationType = (observationTypeDTO) => {
    return observationTypeModel.create(observationTypeDTO);
};

