var mUsers = require("../models/users");
var jwt = require("jsonwebtoken");
var config = require("../config");

superSecret = config.secret;

exports.isAuthenticated = function(req, res, next) {
    var token = req.body.access_token || req.query.access_token || req.headers["authorization"];
    if (token) {
        jwt.verify(token, superSecret, function(err, decoded) {
            if (err) {
                res.status(401).json({message: 'Unauthorized user!'});
            } else {
                mUsers.findOne({ where: {userName: decoded.user.userName} }).then(function(user) {
                    if (user) {
                        req.user = user;
                        next();
                    } else {
                        res.status(401).json({ message: 'Unauthorized user!' });
                    }
                })
            }
        });
    } else {
        res.status(401).json({ message: 'Unauthorized user!' });
    }
};