var express = require("express");
var router = express.Router();
var multer = require("multer");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var config = require("../config");
var mUsers = require("../models/users");
var moment = require("moment");
var validtoken = require("../controllers/authController");
var cryptoRandomString = require("crypto-random-string");
superSecret = config.secret;

var multParse = multer();
//Group Routing
router.route("/info")
.post(multParse.none(),validtoken.isAuthenticated,function(req, res) {
    res.send(req.user);
});
router.route("/changepassword")
.post(multParse.none(),validtoken.isAuthenticated,function(req, res) {
    if(req.user.role == "sysAdmin"){
        result = { type: "fail", error: 99999999, message: "WTF No way to that" };
        res.status(400).send(result);        
    }
    else if (req.body.newpassword == null || req.body.repassword == null) {
        result = { type: "fail", error: 1, message: "Missing required parameter on request" };
        res.status(400).send(result);
    }
    else if ( req.body.newpassword == req.body.repassword ){
        const saltRounds = 10;
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(req.body.newpassword, salt);
        var current_password = req.body.current_password;
        console.log(current_password);
        if(bcrypt.compareSync(current_password, req.user.password)){
            mUsers.update({ password: hash }, { where: { userName: req.user.userName } }).then(function (user) {
                result = { type: "success", message: "Success to Change Password" };
                res.send(result);
            });
        }else{
            result = { type: "error", message: "The Current Password Is Wrong" };
            res.send(result);            
        }
    }else{
        result = { type: "fail", error: 2, message: "2 Password You Input Is Not Match" };
        res.status(400).send(result);
    }
});
router.route("/forget")
.post(multParse.none(),function(req, res) {
    if ( req.body.username == null ){
        result = { type: "fail", error: 1, message: "Missing required parameter on request" };
        res.status(400).send(result);
    }else{
        mUsers.findOne({ where: {userName: req.body.username} }).then(function(data) {
            if (data == null) {
                result = { type: "fail", error: 2, message: "No account with that email address exists." };
                res.status(401).send(result);
            }else if(data.role == "sysAdmin"){
                result = { type: "fail", error: 99999999, message: "WTF No way to that" };
                res.status(400).send(result);
            }else{
                token = cryptoRandomString(25);
                data.resetPasswordToken = token;
                data.resetPasswordExpires = Date.now() + 3600000;
                data.save();
                result = { type: "success", resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 };
                res.send(result);
            }
        });
    }
});
router.route("/reset/:token")
.get(function(req, res) {
    mUsers.findOne({ where: {resetPasswordToken: req.params.token,resetPasswordExpires: { $gt: Date.now() }} }).then(function(data) {
        if ( data == null ){
            res.writeHead(301, {Location:"http://localhost/pplproject-PHP/reset.php?message="+"Password reset token is invalid or has expired"});
            res.end();           
        }else{
            jwt.sign({ user: data }, superSecret, { expiresIn: 5 }, function(err,token) {
                console.log(token);
                res.writeHead(301, {Location:"http://localhost/pplproject-PHP/reset.php?access_token="+token});
                res.end();
            });
        }
    });

});
router.route("/deactive")
.post(multParse.none(),validtoken.isAdmin,function(req, res) {
    mUsers.findOne({ where: {userName: req.body.deactive_user}}).then(function(data) {
        if(data.role != "sysAdmin"){
            data.active = 0
            data.save();
            result = { type: "success", message: "You Have Deactive User:" + req.body.deactive_user };
            res.send(result);   
        }else{
            result = { type: "error", message: "You Don't Have Permission To Do This" };
            res.send(result);               
        }     
    });
})
router.route("/active")
.post(multParse.none(),validtoken.isAdmin,function(req, res) {
    mUsers.findOne({ where: {userName: req.body.active_user}}).then(function(data) {
        data.active = 1
        data.save();
        result = { type: "success", message: "You Have Active User:" + req.body.active_user };
        res.send(result);        
    });
})
router.route("/info")
.get(multParse.none(),validtoken.isAuthenticated,function(req, res) {
    res.json(req.user);
})
router.route("/changerole")
.get(multParse.none(), validtoken.isAuthenticated, function (req, res) {
    if (req.query.userName == null && req.query.role != 'admin' && req.query.role != 'sysAdmin'){
        mUsers.findOne({ where: { userName: req.user.userName } }).then(function (data) {
            data.role = req.query.role;
            data.fstLogin = 1;
            data.save();
            result = { type: "success", message: "You Have Update Role Of User: " + req.user.userName };
            res.send(result);
        });        
    }else{
        res.status(401).json({ message: "You Don't Have Permission To Do This" });
    }
})
router.route("/setadmin")
.post(multParse.none(), validtoken.isSysAdmin, function (req, res) {
    if (req.body.setadmin_user != null){
        mUsers.findOne({ where: { userName: req.body.setadmin_user } }).then(function (data) {
            if(data.role != "sysAdmin"){
                data.role = "admin";
                data.save();
                result = { type: "success", message: "You Have Update Role Of User: " + req.body.setadmin_user + " To Admin" };
                res.send(result);
            }else{
                result = { type: "error", message: "HIHI ko dc đâu" };
                res.send(result);
            }
        });        
    }else{
        res.status(401).json({ message: "You Don't Have Permission To Do This" });
    }
})
router.route("/unsetadmin")
.post(multParse.none(), validtoken.isSysAdmin, function (req, res) {
    if (req.body.unsetadmin_user != null){
        mUsers.findOne({ where: { userName: req.body.unsetadmin_user } }).then(function (data) {
            if (data.role != "sysAdmin") {
                data.role = "user";
                data.save();
                result = { type: "success", message: "You Have Update Role Of User: " + req.body.unsetadmin_user + " To User" };
                res.send(result);
            } else {
                result = { type: "error", message: "HIHI ko dc đâu" };
                res.send(result);         
            }
        });        
    }else{
        res.status(401).json({ message: "You Don't Have Permission To Do This" });
    }
})
 module.exports = router;