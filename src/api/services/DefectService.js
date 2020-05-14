const defectModel = require('../models/DefectModel');

exports.getAllDefects = async (params) => {
    let {observationId} = params;
    if (!observationId) {
        return await defectModel.findAll();
    }
    return await defectModel.findAllByObservationId(observationId);
};

exports.updateDefect = async (defectId, defectDTO) => {
    const defect = await defectModel.find(defectId);
    if (defect.length === 0) {
        throw new Error(`Defect id=${defectId} not found!`);
    }
    const data = {...defect[0], ...defectDTO};
    return defectModel.update(data);
};