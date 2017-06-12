var mongoose = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/assignment'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds137281.mlab.com:37281/heroku_0z73g7zn'; // user yours
}

mongoose.connect(connectionString);

//mongoose.connect('mongodb://localhost/assignment');
mongoose.Promise = require('q').Promise;

require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');