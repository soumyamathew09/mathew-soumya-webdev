var app = require('./express');
var bodyParser = require('body-parser');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: process.env.SESSION_SECRET}))    ;

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

//require("./assignment/app");
require("./project/app");

var port = process.env.PORT || 3000;

app.listen(port);