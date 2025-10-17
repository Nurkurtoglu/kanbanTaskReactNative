import knexConfig from "../knexfile.js"; // knexfile ES Module
import knex from "knex";

const environment = process.env.NODE_ENV || "development";
const db = knex(knexConfig[environment]);

export default db;
