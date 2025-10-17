import dotenv from 'dotenv';
dotenv.config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

export default {
    development: {
        client: "pg",
        connection: {
            database: dbName,
            user: dbUser,
            password: dbPass,
        },
    },
    migrations: {
        directory: "./data/migrations",
    },
    seeds: {
        directory: "./data/seeds",
    },
    production: {}
};
