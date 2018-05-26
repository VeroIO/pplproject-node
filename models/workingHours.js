var sequelize = require("../db.js");
var Sequelize = require("sequelize");
var WorkingHours = sequelize.define(
  "working_hours",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    parrent_id: Sequelize.STRING,
    monday: Sequelize.STRING,
    tuesday: Sequelize.STRING,
    wednesday: Sequelize.STRING,
    thursday: Sequelize.STRING,
    friday: Sequelize.STRING,
    saturday: Sequelize.STRING,
    sunday: Sequelize.STRING,
  },
  {
    timestamps: false
  }
);

module.exports = WorkingHours;