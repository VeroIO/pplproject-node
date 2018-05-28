var sequelize = require("../db.js");
var Sequelize = require("sequelize");
var Comments = sequelize.define(
  "comments",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    parrent_id: Sequelize.STRING,
    parrent_name: Sequelize.STRING,
    cmt_for: Sequelize.STRING,
    content: Sequelize.STRING,
    status: Sequelize.STRING,
    rating: Sequelize.STRING
  },
  {
    timestamps: false
  }
);

module.exports = Comments;