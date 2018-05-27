var express = require("express");
var router = express.Router();
var multer = require("multer");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");
var config = require("../config");
var mUsers = require("../models/users");
var mWorkingHours = require("../models/workingHours");
var moment = require("moment");
var validtoken = require("../controllers/authController");
var cryptoRandomString = require("crypto-random-string");

superSecret = config.secret;
rootPHP = config.phpBaseUrl;

var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "hellcatvn@gmail.com",
        pass: "ydzshkjcmqqdlymj"
    }
};

var smtpTransport = nodemailer.createTransport(smtpConfig);

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
                var mail = {
                    from: 'hellcatvn@gmail.com',
                    to: data.email,
                    subject: 'Ứng Dụng Quản Lí Bệnh Viện',
                    html: '<h1>Tài Khoản :' + data.userName +' Đã Yêu Cầu Reset Mật Khẩu</h1><a href="http://localhost:3000/api/user/reset/'+data.resetPasswordToken+'">Vui Lòng ấn Tại Đây Để reset mật khẩu</a>'
                };
                //Tiến hành gửi email
                smtpTransport.sendMail(mail, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                    smtpTransport.close(); 
                });                
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
            res.writeHead(301, {Location:rootPHP+"/reset.php?message="+"Password reset token is invalid or has expired"});
            res.end();           
        }else{
            jwt.sign({ user: data }, superSecret, { expiresIn: "1h" }, function(err,token) {
                console.log(token);
                res.writeHead(301, {Location:rootPHP+"/reset.php?access_token="+token});
                res.end();
            });
        }
    });

});
router.route("/resetpassword")
.post(multParse.none(),validtoken.isAuthenticated,function(req, res) {
    if(req.user.role == "sysAdmin"){
        result = { type: "fail", error: 99999999, message: "WTF No way to that" };
        res.writeHead(301, { Location: rootPHP + "/login.html?message=" + result.message + "&type=" + result.type });
        res.end();      
    }
    else if (req.body.password == null || req.body.repassword == null) {
        result = { type: "fail", error: 1, message: "Missing required parameter on request to reset password" };
        res.writeHead(301, { Location: rootPHP + "/login.html?message=" + result.message + "&type=" + result.type });
        res.end();
    }
    else if ( req.body.password == req.body.repassword ){
        const saltRounds = 10;
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(req.body.password, salt);
        mUsers.update({ password: hash }, { where: { userName: req.user.userName } }).then(function (user) {
            result = { type: "success", message: "Success to Change Password" };
            res.writeHead(301, { Location: rootPHP + "/login.html?message=" + result.message + "&type=" + result.type });
            res.end();
        });
    }else{
        result = { type: "fail", error: 2, message: "2 Password You Input Is Not Match" };
        res.writeHead(301, { Location: rootPHP + "/login.html?message=" + result.message + "&type=" + result.type });
        res.end();
    }
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
router.route("/update_patient")
.post(multParse.none(), validtoken.isAuthenticated, function (req, res) {
    mUsers.findOne({ where: { userName: req.user.userName } }).then(function (data) {
        data.firstName = req.body.firstName;
        data.lastName = req.body.lastName;
        data.gender = req.body.gender;
        data.email = req.body.email;
        data.address = req.body.address;
        data.languages = req.body.language;
        data.save();
        result = { type: "success", message: "Success To Change Your Profile" };
        res.send(result);        
    });
})
router.route("/update_hospital")
.post(multParse.none(), validtoken.isAuthenticated, function (req, res) {
    mUsers.findOne({ where: { userName: req.user.userName } }).then(function (data) {
        data.firstName = req.body.firstName;
        data.lastName = req.body.lastName;
        data.hospitalName = req.body.hospitalName;
        data.email = req.body.email;
        data.address = req.body.address;
        data.save();
        result = { type: "success", message: "Success To Change Your Profile" };
        res.send(result);        
    });
})
router.route("/update_doctor")
.post(multParse.none(), validtoken.isAuthenticated, function (req, res) {
    mUsers.findOne({ where: { userName: req.user.userName } }).then(function (data) {
        data.firstName = req.body.firstName;
        data.lastName = req.body.lastName;
        data.acceptedInsurance = req.body.acceptedInsurance;
        data.degree = req.body.degree;
        data.email = req.body.email;
        data.languages = req.body.language;
        data.gender = req.body.gender;
        data.save();
        // result = { type: "success", message: "Success To Change Your Profile" };
        // res.send(result);        
    });
    mWorkingHours.findOne({ where: { parrent_id: req.user.id } }).then(function (data) {
        if(data == null){
            var newWorkingHours = {
                parrent_id: req.user.id,
                monday: req.body.monday_start + '-' + req.body.monday_end ,
                tuesday: req.body.tuesday_start + '-' + req.body.tuesday_end,
                wednesday: req.body.wednesday_start + '-' + req.body.wednesday_end,
                thursday: req.body.thursday_start + '-' + req.body.thursday_end,
                friday: req.body.friday_start + '-' + req.body.friday_end,
                saturday: req.body.saturday_start + '-' + req.body.saturday_end,
                sunday: req.body.sunday_start + '-' + req.body.sunday_end,
            };
            mWorkingHours.create(newWorkingHours).then(function (data) {
                result = { type: "success", message: "Success To Create New Working Hours", data: data };
                res.send(result);
            })              
        }else{
            data.monday = req.body.monday_start + "-" + req.body.monday_end;
            data.tuesday = req.body.tuesday_start + "-" + req.body.tuesday_end;
            data.wednesday = req.body.wednesday_start + "-" + req.body.wednesday_end;
            data.thursday = req.body.thursday_start + "-" + req.body.thursday_end;
            data.friday = req.body.friday_start + "-" + req.body.friday_end;
            data.saturday = req.body.saturday_start + "-" + req.body.saturday_end;
            data.sunday = req.body.sunday_start + "-" + req.body.sunday_end;
            data.save();
            result = { type: "success", message: "Success To Save Working Hours", data: data };
            res.send(result);
        }
    });
})
router.route("/get_working_hours")
.get(function(req, res) {
    mWorkingHours.findOne({ where: { parrent_id: req.query.doctor_id } }).then(function (data) {
        res.send(data);
    });
});
router.route("/doctorprofile")
.get(function(req, res) {
    mUsers.findOne({ where: { id: req.query.id } }).then(function (data1) {
        mWorkingHours.findOne({ where: { parrent_id: req.query.id } }).then(function (data2) {
            result = {data:data1,workingHours:data2};
            res.send(result);
        });        
    });
});
 module.exports = router;