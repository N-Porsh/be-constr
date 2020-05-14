const query = require('../../db').query;

exports.find = async (id) => {
    const {rows} = await query('SELECT * FROM defect WHERE id=$1 LIMIT 1', [id]);
    return rows;
};

exports.findAll = async () => {
    const sql = `SELECT json_agg(t) AS result
                 FROM (
                          SELECT defect.*,
                                 rp.name  AS responsible_person_name,
                                 rp.email AS responsible_person_email,
                                 (
                                     SELECT array_to_json(array_agg(row_to_json(d)))
                                     FROM (
                                              SELECT id, path
                                              FROM attachment
                                              WHERE defect_id = defect.id
                                          ) d
                                 )        AS attachments
                          FROM defect
                                   inner join responsible_person rp on defect.responsible_person_id = rp.id
                          ORDER BY id ASC
                      ) t`;

    const {rows} = await query(sql);
    if (rows[0].result == null) {
        return [];
    }
    return rows[0].result;
};

exports.findAllByObservationId = async (observationId) => {
    const sql = `SELECT json_agg(t) AS result
                 FROM (
                          SELECT defect.*,
                                 rp.name  AS responsible_person_name,
                                 rp.email AS responsible_person_email,
                                 (
                                     SELECT array_to_json(array_agg(row_to_json(d)))
                                     FROM (
                                              SELECT id, path
                                              FROM attachment
                                              WHERE defect_id = defect.id
                                          ) d
                                 )        AS attachments
                          FROM defect
                                   inner join responsible_person rp on defect.responsible_person_id = rp.id
                          WHERE observation_id = $1
                          ORDER BY id ASC
                      ) t`;

    const {rows} = await query(sql, [observationId]);
    if (rows[0].result == null) {
        return [];
    }
    return rows[0].result;
};

exports.update = async (data) => {
    const sql = `UPDATE defect
                 SET observation_id        = $observation_id,
                     responsible_person_id = $responsible_person_id,
                     resolved              = $resolved,
                     resolved_date         = $resolved_date,
                     deadline              = $deadline,
                     description           = $description
                 WHERE id = $id
                 RETURNING *`;
    const {rows} = await query(sql, data);
    return rows;
};