const query = require('../../db').query;
const bcrypt = require('bcryptjs');

function bcryptPassword(password) {
    return bcrypt.hashSync(password, 10);
}

exports.find = async (id) => {
    return await query('SELECT * FROM user WHERE id=$1 LIMIT 1', [id]);
};

exports.findByEmail = async (email) => {
    return await query(`SELECT *
                        FROM "user"
                        WHERE email = $1
                        LIMIT 1`, [email]);
};

exports.create = async (data) => {
    data.password = bcryptPassword(data.password);

    const sql = `INSERT INTO "user" (role, name, email, password)
                 VALUES ($role, $name, $email, $password)
                 returning id, name, email`;
    const {rows} = await query(sql, data);
    return rows;
};