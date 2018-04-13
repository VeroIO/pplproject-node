const Sequelize = require("sequelize");
var mysql = require("mysql2");
var sequelize = new Sequelize("hospital", "root", "long", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
module.exports = sequelize;