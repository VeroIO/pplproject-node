var express = require("express");
var router = express.Router();
var multer = require("multer");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var config = require("../config");
var mUsers = require("../models/users");
var moment = require("moment");
superSecret = config.secret;

var multParse = multer();
//Group Routing
router.route("/")
.get(function(req, res) {
    result = {
        "errors": {
            "code":   "403",
            "title":  "Forbidden",
        }
    }
  res.send(result);  
})
.post(multParse.none(),function(req, res) {
    username = req.body.username;
    password = req.body.password;
    console.log(username,password);
    if(username ==null){
        result = { type:"fail" ,error: 1, message: "Please Input Your Username" };
        res.status(401).send(result);
    }else if(password == null){
        result = { type:"fail" ,error: 2, message: "Please Input Your Password" };
        res.status(401).send(result);
    }else{
        mUsers.findOne({ where: {userName: username} }).then(function(data) {
            if (data == null) {
                result = { type:"fail" ,error: 3, message: "No Account Have Been Found" };
                res.status(401).send(result);               
            }else if (!bcrypt.compareSync(password, data.password)) {
                result = { type:"fail" ,error: 4, message: "Input Password was wrong" };
                res.status(401).send(result);                
            }else{
                jwt.sign({ user: data }, superSecret, { expiresIn: "1h" }, function(err,token) {
                    time=moment().format("YYYY-MM-DD-ddd|hh:mm:ss");
                    result = { type: "success" , token : token , createdAt : time , expiresIn : "2 Hours" };
                    res.send(result);
                });
            }
        });  
    }
}
);
module.exports = router;