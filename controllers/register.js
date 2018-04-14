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
.post(multParse.none(),function(req, res) {
    username = req.body.username;
    password = req.body.password;
    repassword = req.body.repassword;
    console.log(username,password);
    if(username ==null){
        result = { type:"fail" ,error: 1, message: "Please Input Your Username" };
        res.status(400).send(result);
    }else if(password == null){
        result = { type:"fail" ,error: 2, message: "Please Input Your Password" };
        res.status(400).send(result);
    }else if(repassword == null ){
        result = { type: "fail", error: 3, message: "Please Input Your Recheck Password" };
        res.status(400).send(result);
    }else if(repassword != password){
        result = { type: "fail", error: 4, message: "2 Password You Input Is Not Match" };
        res.status(400).send(result);
    }else{
        mUsers.findOne({ where: {userName: username} }).then(function(data) {
            if (data != null) {
                result = { type:"fail" ,error: 5, message: "Username you use is exist in server" };
                res.status(400).send(result);               
            }else{
                const saltRounds = 10;
                var salt = bcrypt.genSaltSync(saltRounds);
                var hash = bcrypt.hashSync(password, salt);
                var newUser = { userName: username, password: hash , fstLogin : 0 , active : 0 , role : 'user' };
                mUsers.create(newUser).then(function(data) {
                    result = { type: "success", message: "Success to register" ,data:data };
                    res.send(result);
                })                       
            }
        });  
    }
}
);
module.exports = router;