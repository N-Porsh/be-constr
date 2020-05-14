const query = require('../../db').query;

exports.create = async (data) => {
    const sql = `INSERT INTO attachment (defect_id, path)
                 VALUES ($defect_id, $path)`;
    await query(sql, data);
};