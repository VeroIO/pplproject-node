var express = require('express');
var router = express.Router();
var Login = require("../controllers/login");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.use("/api/login", Login);

module.exports = router;