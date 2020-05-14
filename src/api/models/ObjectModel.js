const query = require('../../db').query;

exports.findAll = async () => {
    const {rows} = await query('SELECT * FROM object');
    if (!rows) {
        return [];
    }
    return rows;
};

exports.findAllActive = async () => {
    const {rows} = await query('SELECT * FROM object WHERE active=true');
    if (!rows) {
        return [];
    }
    return rows;
};

exports.find = async (id) => {
    return await query('SELECT * FROM object WHERE id=$1 LIMIT 1', [id]);
};

exports.create = async (data) => {
    const sql = `INSERT INTO object (name, location, last_inspection_date)
                 VALUES ($name, $location, $last_inspection_date) returning *`;
    const {rows} = await query(sql, data);
    return rows;
};