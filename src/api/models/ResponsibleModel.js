const query = require('../../db').query;

exports.findAllByName = async (name) => {
    const {rows} = await query(`SELECT *
                                FROM responsible_person
                                WHERE LOWER(name) LIKE $1`, [`${name}%`]);
    return rows;
};

exports.findAll = async () => {
    const {rows} = await query('SELECT * FROM responsible_person');
    return rows;
};

exports.findByEmail = async (email) => {
    const {rows} = await query('SELECT * FROM responsible_person WHERE email=$1', [email]);
    return rows;
};

exports.create = async (data) => {
    const sql = `INSERT INTO responsible_person (name, email)
                 VALUES ($name, $email)
                 returning *`;
    const {rows} = await query(sql, data);
    return rows;
};