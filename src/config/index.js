require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_expires_in: "30d",
    bucketName: "mapri-bucket-uploads",
    migration: {
        run: process.env.DB_MIGRATE
    },
    db: {
        connectionString: process.env.DATABASE_URL,
        max: process.env.PGMAX_CONNECTIONS,
        idleTimeoutMillis: 30000
    }
};