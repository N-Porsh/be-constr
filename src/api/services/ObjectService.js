const createError = require('http-errors');
const objectModel = require('../models/ObjectModel');

exports.getAllObjects = () => {
    return objectModel.findAllActive();
};

exports.getObject = async (id) => {
    const {rows, rowCount} = await objectModel.find(id);
    if (!rowCount) {
        throw createError(404);
    }
    return rows;
};

exports.createObject = (objectDTO) => {
    return objectModel.create(objectDTO);
};