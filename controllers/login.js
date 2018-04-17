var express = require("express");
var router = express.Router();
var multer = require("multer");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var config = require("../config");
var mUsers = require("../models/users");
var moment = require("moment");
superSecret = config.secret;
rootPHP = config.phpBaseUrl;

var multParse = multer();
//Group Routing
router.route("/")
.post(multParse.none(),function(req, res) {
    username = req.body.username;
    password = req.body.password;
    console.log(username,password);
    if(username ==null){       
        result = { type:"fail" ,error: 1, message: "Please Input Your Username" };
        res.writeHead(301, {Location: rootPHP+"/controllers/cLogin.php?message=" + result.message });
        res.end();          
    }else if(password == null){
        result = { type:"fail" ,error: 2, message: "Please Input Your Password" };
        res.writeHead(301, {Location: rootPHP+"/controllers/cLogin.php?message=" + result.message });
        res.end();
    }else{
        mUsers.findOne({ where: {userName: username} }).then(function(data) {
            if (data == null) {
                result = { type:"fail" ,error: 3, message: "No Account Have Been Found" };
                res.writeHead(301, {Location: rootPHP+"/controllers/cLogin.php?message=" + result.message });
                res.end();              
            }else if (!bcrypt.compareSync(password, data.password)) {
                result = { type:"fail" ,error: 4, message: "Input Password was wrong" };
                res.writeHead(301, {Location: rootPHP+"/controllers/cLogin.php?message=" + result.message });
                res.end();               
            }else{
                jwt.sign({ user: data }, superSecret, { expiresIn: "1h" }, function(err,token) {
                    time=moment().format("YYYY-MM-DD-ddd|hh:mm:ss");
                    result = { type: "success" , token : token , createdAt : time , expiresIn : "2 Hours" };
                    res.writeHead(301, {Location: rootPHP+"/controllers/cLogin.php?token=" + result.token });
                    res.end();
                });
            }
        });  
    }
}
);
module.exports = router;