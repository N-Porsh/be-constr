const query = require('../../db').query;

exports.findAllActive = async () => {
    const {rows} = await query('SELECT * FROM observation_type WHERE active=true');
    return rows;
};

exports.create = async (data) => {
    const sql = `INSERT INTO observation_type (name, active, description)
                 VALUES ($name, $active, $description)
                 returning *`;
    const {rows} = await query(sql, data);
    return rows;
};