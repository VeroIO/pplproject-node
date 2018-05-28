var express = require("express");
var router = express.Router();
var multer = require("multer");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var config = require("../config");
var mUsers = require("../models/users");
var mComments = require("../models/comments");
var moment = require("moment");
var validtoken = require("../controllers/authController");
var cryptoRandomString = require("crypto-random-string");
superSecret = config.secret;

var multParse = multer();

router.route("/userlist")
.get(multParse.none(), validtoken.isAdmin, function (req, res) {
    mUsers.findAndCountAll({ offset: parseInt(req.query.offset), limit: parseInt(req.query.limit)}).then(result => {
         res.json(result)
    });
})
router.route("/commentlist")
.get(multParse.none(), validtoken.isAdmin, function (req, res) {
    mComments.findAndCountAll({ offset: parseInt(req.query.offset), limit: parseInt(req.query.limit)}).then(result => {
         res.json(result)
    });
})

module.exports = router;