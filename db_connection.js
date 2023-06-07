require("dotenv").config();
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.POSTGRESQL_DB_URI);

module.exports = sequelize;
