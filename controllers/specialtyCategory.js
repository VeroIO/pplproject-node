var express = require("express");
var router = express.Router();
var multer = require("multer");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var config = require("../config");
var mSpecialty = require("../models/specialtyCategory");
var moment = require("moment");
var validtoken = require("../controllers/authController");
var cryptoRandomString = require("crypto-random-string");
superSecret = config.secret;

var multParse = multer();
//Group Routing
router.route("/specialtylist")
.get(multParse.none(), validtoken.isAdmin, function (req, res) {
    mSpecialty.findAndCountAll({ offset: parseInt(req.query.offset), limit: parseInt(req.query.limit)}).then(result => {
         res.json(result)
    });
})
router.route("/add")
.post(multParse.none(), validtoken.isAdmin, function (req, res) {
    if (req.body.typeName != null){
        var newSpecialty = { type: req.body.typeName };
        mSpecialty.create(newSpecialty).then(function (data) {
            result = { type: "success", message: "Success to add new specialty", data: data };
            res.json(result);
        })
    }else{
        result = { type: "error", message: "Please Input Name Of New Specialty"};
        res.json(result);        
    }
})
router.route("/del")
.post(multParse.none(), validtoken.isAdmin, function (req, res) {
    mSpecialty.destroy({ where: { id: req.body.specialtyId } }).then(function (results) {
        if (results == 1) {
            result = { type: "success", message: "Đã Thành Xóa Thành Công ID:" + req.body.specialtyId };
            res.json(result);
        } else {
            result = { type: "error", message: "Thao Tác Không Thành Công" };
            res.json(result);            
        }
    });
})
module.exports = router;