const query = require('../../db').query;

exports.create = async (data) => {
    const values = Object.values(data);
    const sql = `INSERT INTO object (name, location, last_inspection_date)
                 VALUES ($1, $2, $3) returning *`;
    const {rows} = await query(sql, values);
    return rows;
};