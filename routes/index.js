var express = require('express');
var router = express.Router();
var Login = require("../controllers/login");
var Register = require("../controllers/register");
var Users = require("../controllers/users");
var Admin = require("../controllers/admin");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.use("/api/login", Login);
router.use("/api/register", Register);
router.use("/api/user", Users);
router.use("/api/admin",Admin);

module.exports = router;