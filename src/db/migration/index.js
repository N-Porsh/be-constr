const { QueryFile } = require('pg-promise');
const path = require('path');
const pgp = require('pg-promise');
const config = require('../../config');
const db = pgp()(config.db.connectionString);
const initialSQL = new QueryFile(path.join(__dirname, './sql/initial.sql'));
const initialData = new QueryFile(path.join(__dirname, './sql/data.sql'));

module.exports.migration = async function() {
    console.log('Running DB migration');
    await db.none(initialSQL);

    console.log("inserting data");
    await db.none(initialData);
    console.info("migration finished");
    return;
}