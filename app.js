var express = require('express'),mailer = require('express-mailer');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

// mongoose.connect(require("./conf/db-credentials")["DB_URL"],{server:{
//     socketOptions : {keepAlive : 1}
// }});

mongoose.connect("mongodb://127.0.0.1:27017/foodrecommendationdb",{server:{
     socketOptions : {keepAlive : 1}
}});

var index = require('./routes/index');
var users = require('./routes/users');
var diets = require("./routes/diet");
var consts = require("./routes/consts");
var tests = require("./routes/tests");

var app = express();
mailer.extend(app,require("./conf/mail-credentials"));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/user', users);
app.use('/diet',diets);
app.use("/const",consts);
app.use("/test",tests);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
