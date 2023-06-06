const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("sequelize", "root", "2J4u6vm0-", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
