var sequelize = require("../db.js");
var Sequelize = require("sequelize");
var Users = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userName: Sequelize.STRING,
    password: Sequelize.STRING,
    fstLogin: Sequelize.STRING,
    active: Sequelize.INTEGER,
    role: Sequelize.STRING,
    resetPasswordToken: Sequelize.STRING,
    resetPasswordExpires: Sequelize.DATE,
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    gender: Sequelize.STRING,
    email: Sequelize.STRING,
    hospitalName: Sequelize.STRING,
    address: Sequelize.STRING,
    languages: Sequelize.STRING,
    website: Sequelize.STRING,
    workIn: Sequelize.INTEGER,
    degree: Sequelize.STRING,
    acceptedInsurance: Sequelize.STRING,
    specialty: Sequelize.STRING,
    workHours: Sequelize.INTEGER
  },
  {
    timestamps: false
  }
);

module.exports = Users;