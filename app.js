var express = require('express');
const multer = require('multer')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var Util = require('./submodule/work/Util.js');
var fs = require('fs');


var util = new Util();
console.log('###', util.unixtime());


var routes = require('./routes/index');
var users = require('./routes/users');
var fileupload = require('./routes/fileupload');
var compare = require('./routes/compare');

var app = express();

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

app.use('/', routes);
app.use('/users', users);
app.use('/fileupload', fileupload);
app.use('/compare', compare);

// アップロードされたファイルの受け取り
const upload = multer({ dest: 'uploaded' })
app.post('/upload', upload.single('upName'), (req, res) => {
  var originalname = req.file.originalname;
  console.log(`originalname: ${originalname}`);
  var filepath = req.file.path;
  var basename = path.basename(filepath);
  console.log(`basename: ${basename}`);
  console.log('###', util.unixtime());
  var data = {
    unixtime: util.unixtime(),
    originalname: originalname,
    filepath: filepath
  }
  console.log(data);
  // データ書き込み
  fs.writeFile('./data/' + basename + '.json', JSON.stringify(data, null , "\t"), function (err) {
    console.log(err);
  });
  console.log(`path: ${req.file.path}`);

  res.send(JSON.stringify({ ok: true }))
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
