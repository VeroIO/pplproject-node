var sequelize = require("../db.js");
var Sequelize = require("sequelize");
var specialtyCategory = sequelize.define(
  "specialty_categories",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: Sequelize.STRING
  },
  {
    timestamps: false
  }
);

module.exports = specialtyCategory;