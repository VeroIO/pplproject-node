var sequelize = require("../db.js");
var Sequelize = require("sequelize");
var Bookmarks = sequelize.define(
    "bookmarks",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        parrent_id: Sequelize.STRING,
        bookmarked_id: Sequelize.STRING,
    },
    {
        timestamps: false
    }
);

module.exports = Bookmarks;