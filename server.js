var express = require('express');
var connect = require('connect');
var router  = require('./router/router');
var port    = 9999;
var app     = express();

app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(connect.cookieParser());
app.use(connect.cookieSession({secret: "craig is a lame butt"}));
router(app);

app.listen(port);
console.log("Server started on Port "+ port);