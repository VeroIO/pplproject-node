var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var morgan = require("morgan");
var session = require("express-session");
var cookieParser = require("cookie-parser");

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res) {
  result={statusCode: 404,error : "Page not found", message : "Don't try do anything,this resource in currently unavailabe"}
  res.status(404).send(result);
});

module.exports = app;
