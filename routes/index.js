var express = require('express');
var router = express.Router();
var Login = require("../controllers/login");
var Register = require("../controllers/register");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.use("/api/login", Login);
router.use("/api/register", Register);


module.exports = router;