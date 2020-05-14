const query = require('../../db').query;
const pool = require('../../db').pool;
const named = require('node-postgres-named');
const isEqual = require('lodash/isEqual');
const attachmentService = require('../services/AttachmentService');


exports.findAllByObjectId = async (objectId) => {
    const sql = `
        select json_agg(t) as result
        from (
                 select report.*,
                        u.name as user_name,
                        (
                            select array_to_json(array_agg(row_to_json(o)))
                            from (
                                     select ot.name        as observation_type_name,
                                            ot.description as observation_type_description,
                                            observation.*,
                                            (
                                                select array_to_json(array_agg(row_to_json(d)))
                                                from (
                                                         select defect.*,
                                                                rp.name  as responsible_person_name,
                                                                rp.email as responsible_person_email
                                                                 ,
                                                                (
                                                                    select array_to_json(array_agg(row_to_json(a)))
                                                                    from (
                                                                             select id, path
                                                                             from attachment
                                                                             where defect_id = defect.id
                                                                         ) a
                                                                )        as attachments
                                                         from defect
                                                                  inner join responsible_person rp on defect.responsible_person_id = rp.id
                                                         where observation.id = defect.observation_id
                                                     ) d
                                            )              as defects
                                     from observation
                                              inner join observation_type ot on observation.observation_type_id = ot.id
                                     where report_id = report.id
                                     order by id
                                 ) o
                        )      as observations
                 from report
                          inner join "user" u on report.user_id = u.id
                 where report.object_id = $1
             ) t
    `;
    const {rows} = await query(sql, [objectId]);
    if (rows[0].result == null) {
        return [];
    }
    return rows[0].result;
};

exports.find = async (reportId) => {
    const sql = `
        select json_agg(t) as result
        from (
                 select report.*,
                        u.name as user_name,
                        (
                            select array_to_json(array_agg(row_to_json(o)))
                            from (
                                     select ot.name        as observation_type_name,
                                            ot.description as observation_type_description,
                                            observation.*,
                                            (
                                                select array_to_json(array_agg(row_to_json(d)))
                                                from (
                                                         select defect.*,
                                                                rp.name  as responsible_person_name,
                                                                rp.email as responsible_person_email
                                                                 ,
                                                                (
                                                                    select array_to_json(array_agg(row_to_json(a)))
                                                                    from (
                                                                             select id, path
                                                                             from attachment
                                                                             where defect_id = defect.id
                                                                         ) a
                                                                )        as attachments
                                                         from defect
                                                                  inner join responsible_person rp on defect.responsible_person_id = rp.id
                                                         where observation.id = defect.observation_id
                                                     ) d
                                            )              as defects
                                     from observation
                                              inner join observation_type ot on observation.observation_type_id = ot.id
                                     where report_id = report.id
                                     order by id
                                 ) o
                        )      as observations
                 from report
                          inner join "user" u on report.user_id = u.id
                 where report.id = $1
             ) t
    `;
    const {rows} = await query(sql, [reportId]);
    if (rows[0].result == null) {
        return [];
    }
    return rows[0].result;
};

exports.findAll = async () => {
    const sql = `
        select json_agg(t) as result
        from (
                 select report.*,
                        u.name as user_name,
                        (
                            select array_to_json(array_agg(row_to_json(o)))
                            from (
                                     select ot.name        as observation_type_name,
                                            ot.description as observation_type_description,
                                            observation.*,
                                            (
                                                select array_to_json(array_agg(row_to_json(d)))
                                                from (
                                                         select defect.*,
                                                                rp.name  as responsible_person_name,
                                                                rp.email as responsible_person_email
                                                                 ,
                                                                (
                                                                    select array_to_json(array_agg(row_to_json(a)))
                                                                    from (
                                                                             select id, path
                                                                             from attachment
                                                                             where defect_id = defect.id
                                                                         ) a
                                                                )        as attachments
                                                         from defect
                                                                  inner join responsible_person rp on defect.responsible_person_id = rp.id
                                                         where observation.id = defect.observation_id
                                                         order by defect.id
                                                     ) d
                                            )              as defects
                                     from observation
                                              inner join observation_type ot on observation.observation_type_id = ot.id
                                     where report_id = report.id
                                     order by id
                                 ) o
                        )      as observations
                 from report
                          inner join "user" u on report.user_id = u.id
             ) t
    `;
    const {rows} = await query(sql);
    if (rows[0].result == null) {
        return [];
    }
    return rows[0].result;
};

exports.create = async (data) => {
    const client = await pool.connect();
    named.patch(client);
    try {
        await client.query('BEGIN');
        const report_id = await addReport(client, data);
        for (const observation of data.observations) {
            // insert observations
            observation.report_id = report_id;
            const observation_id = await addObservation(client, observation);

            const hasDefects = Array.isArray(observation.defects);
            if (!hasDefects) continue; // no defects - nothing to do here further
            for await (let defect of observation.defects) {
                if (defect.responsible_person_id == null) {
                    defect.responsible_person_id = await newResponsiblePerson(client, defect);
                }

                defect.observation_id = observation_id;
                const defectId = await createDefect(client, defect);
                // upload attachments if provided
                if (Array.isArray(defect.attachments) && defect.attachments.length) {
                    attachmentService.uploadAttachments(defectId, defect.attachments);
                }
            }
        }
        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e
    } finally {
        client.release();
    }
};

async function newResponsiblePerson(client, data) {
    const sql = `INSERT INTO responsible_person (name, email)
                 VALUES ($name, $email)
                 RETURNING id`;
    const {rows} = await client.query(sql, {
        name: data.responsible_person_name,
        email: data.responsible_person_email
    });
    return rows[0].id;
}

async function addReport(client, data) {
    const sql = `insert into report (object_id, user_id, status, description)
                 values ($object_id, $user_id, $status, $description)
                 returning report.id`;
    const {rows} = await client.query(sql, data);
    return rows[0].id;
}

async function updateReport(client, data) {
    const sql = `UPDATE report
                 SET object_id     = $object_id,
                     user_id       = $user_id,
                     status        = $status,
                     description   = $description,
                     modified_date = current_timestamp
                 WHERE id = $id`;
    await client.query(sql, data);
}

async function addObservation(client, data) {
    const sql = `insert into observation (report_id, observation_type_id, correct_count)
                 values ($report_id, $observation_type_id, $correct_count)
                 returning observation.id`;
    const {rows} = await client.query(sql, data);
    return rows[0].id;
}

async function updateObservationIfNeeded(client, observation, observationDTO) {
    if (!isEqual(observation, observationDTO)) {
        const sql = `UPDATE observation
                     SET observation_type_id = $observation_type_id,
                         correct_count       = $correct_count
                     WHERE id = $id`;
        await client.query(sql, observationDTO);
    }
}

async function updateDefect(client, data) {
    const sql = `UPDATE defect
                 SET deadline              = $deadline,
                     description           = $description,
                     responsible_person_id = $responsible_person_id
                 WHERE id = $id`;
    await client.query(sql, data);
}

async function createDefect(client, data) {
    const sql = `INSERT INTO defect (observation_id, responsible_person_id, deadline, description)
                 VALUES ($observation_id, $responsible_person_id, $deadline, $description)
                 returning defect.id`;
    const {rows} = await client.query(sql, data);
    return rows[0].id;
}

async function getDefect(client, defect) {
    const sql = `SELECT d.id,
                        d.deadline,
                        d.description,
                        d.responsible_person_id,
                        rp.name  as responsible_person_name,
                        rp.email as responsible_person_email
                 FROM defect d
                          inner join responsible_person rp on d.responsible_person_id = rp.id
                 WHERE d.id = $id`;
    const {rows, rowCount} = await client.query(sql, defect);
    return {rows, rowCount};
}

async function updateDefects(client, observation) {
    const defects = observation.defects;
    const hasDefects = Array.isArray(defects);
    if (!hasDefects) {
        return;
    }

    for (let defect of defects) {
        // create new defect if id==null
        if (defect.id == null) {
            if (defect.responsible_person_id == null) {
                defect.responsible_person_id = await newResponsiblePerson(client, defect);
            }

            defect.observation_id = observation.id;
            await createDefect(client, defect);
            continue;
        }

        const {rows, rowCount} = await getDefect(client, defect);
        if (rowCount === 0) {
            throw new Error(`Defect id=${defect.id} not found!`);
        }

        defect = {...rows[0], ...defect};
        defect.deadline = new Date(defect.deadline); // convert to Date format
        // perform `defects` update only if data differentiates
        if (!isEqual(rows[0], defect)) {
            if (defect.responsible_person_id == null) {
                defect.responsible_person_id = await newResponsiblePerson(client, defect);
            }
            await updateDefect(client, defect);
        }
    }
}

/**
 * Updates 1 report, its observations, its defects(only that were passed in request data,
 * other observations/defects might be not changed).
 * Responsible person can be created and assigned to defect if responsible_person_id: null (name,email should be passed)
 * @param data
 * @returns {Promise<void>}
 */
exports.update = async (data) => {
    const observationsDTO = data.observations;

    const client = await pool.connect();
    named.patch(client);
    try {
        await client.query('BEGIN');
        await updateReport(client, data);

        const getObservation = "SELECT id, observation_type_id, correct_count FROM observation WHERE id=$id";
        for (let observation of observationsDTO) {
            const {rows, rowCount} = await client.query(getObservation, observation);
            if (rowCount === 0) {
                throw new Error(`Observation id=${observation.id} not found!`);
            }

            observation = {...rows[0], ...observation};
            await updateObservationIfNeeded(client, rows[0], observation);
            await updateDefects(client, observation);
        }

        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e
    } finally {
        client.release();
    }
};