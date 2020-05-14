const responsibleModel = require('../models/ResponsibleModel');

exports.getAllResponsibleUsers = async (params) => {
    let {name} = params;
    if (!name) {
        return await responsibleModel.findAll();
    }
    return await responsibleModel.findAllByName(name.toLowerCase());
};

exports.addResponsiblePerson = async (personDTO) => {
    const person = await responsibleModel.findByEmail(personDTO.email);
    if (person.length !== 0) {
        throw new Error("This email already exists");
    }
    return responsibleModel.create(personDTO);
};