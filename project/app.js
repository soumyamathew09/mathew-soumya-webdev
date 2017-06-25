var mongoose = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/project'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds137281.mlab.com:37281/heroku_0z73g7zn';
}

mongoose.connect(connectionString);

//mongoose.connect('mongodb://localhost/assignment');
mongoose.Promise = require('q').Promise;

//TODO - change to new services

require('./services/user.service.server');
require('./services/event.service.server');
require('./services/post.service.server');