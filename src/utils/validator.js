const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const createError = require('http-errors');

const loadSchema = () => {
    const schemaPath = path.resolve(process.cwd(), 'public/schemas/defs.json');

    if (!fs.existsSync(schemaPath)) {
        throw createError(500, `Schema file doesn't exists`);
    }

    const content = fs.readFileSync(schemaPath);
    return JSON.parse(content);
};

module.exports = property => {
    const schema = loadSchema();
    const ref = schema.definitions[property];
    const ajv = new Ajv({allErrors: true});
    return ajv.addSchema(schema).compile(ref);
}