var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');
const mongoose = require('mongoose');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var uploadRouter=require('./routes/uploadRouter');
const DB_USER = 'Nirav';
const PASSWORD = encodeURIComponent('Nirav@2001'); 
const uri =  config.mongoUrl;

const connect=mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false });


connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));


app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users/profileImage',uploadRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
