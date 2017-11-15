var express = require('express');
var path = require('path');
var http = require('http');
var https = require('https');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const formidable = require('express-formidable');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var users = require('./routes/userRouter.js');
var posts = require('./routes/postRouter');
var comments = require('./routes/commentRouter');
var database = require('./config/config.js');

var ChatServer = require('./chat/chat.js');
var authentication = require('./middlewares/auth.middleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
var mySecret = 'Secret';


app.use(authentication);

app.use('/users', bodyParser.json(), users);
app.use('/comments', bodyParser.json(), comments);
app.use('/posts', posts);

app.use(function (req, res, next) {
    console.log("404 mw ", req.originalUrl);
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    console.log("err :(")
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.json('error');
});


var privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// var io = require('socket.io')(httpServer);

httpServer.listen(8080, function () {
    console.log('API listening on port 8080 !');
});

httpsServer.listen(8443, function () {
    console.log('API listening on port 8443 !');
});

let chatServer = new ChatServer(2222);
chatServer.run();


module.exports = app;
