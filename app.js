var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelizeInit = require('./config/sequelize/init');

var guestRouter = require('./routes/guestRoute');
var reservationsRouter = require('./routes/reservationsRoute');
var tablesRouter = require('./routes/tablesRoute');
var indexRouter = require('./routes/indexRoute');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'ejs');
const guestApiRouter = require('./routes/api/GuestApiRoute');
app.use('/api/guests', guestApiRouter);
const reservationApiRouter = require('./routes/api/ReservationApiRoute');
app.use('/api/reservations', reservationApiRouter);
const tableApiRouter = require('./routes/api/TableApiRoute');
app.use('/api/tables', tableApiRouter);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/guests', guestRouter);
app.use('/reservations', reservationsRouter);
app.use('/tables', tablesRouter);
app.use('/', indexRouter);

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

sequelizeInit()
    .catch(err => {
        console.log(err);
    });

module.exports = app;
