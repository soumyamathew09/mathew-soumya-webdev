    var app = require('../../express');
    var userModel = require('../model/user/user.model.server');
    var eventModel = require('../model/event/event.model.server');
    var postModel = require('../model/post/post.model.server');
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");



    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var FacebookStrategy = require('passport-facebook').Strategy;

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['email','id','name','displayName']
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    app.get ('/api/project/user/:userId', findUserById);
    app.get ('/api/project/bituser/:bitId', findUserByBitId);
    app.get ('/api/project/bituserName/:bitName', findUserByBitName);
    app.get ('/api/project/admin/user',isAdmin, findAllUsers);
    app.get ('/api/project/newartist', findNewArtists);
    app.get ('/api/project/user', findUser);
    app.post('/api/project/user',isAdmin, createUser);
    app.put('/api/project/follow/:followingId', addFollowing);
    app.put('/api/project/unfollow/:followingId', removeFollowing);
    app.put ('/api/project/user/:userId', updateUser);
    app.delete ('/api/project/user/:userId',isAdmin, deleteUser);
    app.post  ('/api/project/login', passport.authenticate('local'), login);
    app.post  ('/api/project/logout', logout);
    app.post  ('/api/project/register', register);
    app.post  ('/api/project/unregister', unregister);
    app.get  ('/api/project/loggedin', loggedin);
    app.get  ('/api/project/checkAdmin', checkAdmin);
    app.get('/api/project/followers/:userId', findAllFollowers);
    app.get('/api/project/following/:userId', findAllFollowing);
    app.get('/api/project/followingInfo/:userId', findPostByUser);
    app.get('/api/project/attend/:userId', findAllEventsAttending);


    app.get('/auth/facebook', passport.authenticate('facebook', { scope : [ 'email'] }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/index.html#!/home',
            failureRedirect: '/project/index.html#!/login'
        }));

    function isAdmin(req,res,next) {
        if((req.isAuthenticated()&& req.user.roles.indexOf("ADMIN")>-1)){
            next();
        }
        else {
            res.sendStatus(401);
        }
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user && bcrypt.compareSync(password,user.password)) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            }, function (error) {
                done(error, false);
            });
    }

    function createUser(req, res) {

        var user = req.body;
        user.password = bcrypt.hashSync(user.username);
        return userModel.createUser(user)
            .then(function (doc) {
                res.json(doc);
                return;
            });
    }

    function findUserById(req, res) {
        var userId = req.params['userId'];

        userModel.findUserById(userId)
            .then(function (doc) {
                res.json(doc);
            });

    }

    function findNewArtists(req,res) {
        userModel.findNewArtists()
            .then(function (artists) {
                res.json(artists);
                return;
            });
    }

    function findAllUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            userModel.findUserByCredentials(username,password)
                .then(
                    function (user) {
                        if(user && bcrypt.compareSync(password, user.password)){
                            return done(null, user);
                        }
                        else{
                            return done(null, false);
                        }
                    }
                );
        } else if(username) {

          userModel.findUserByUsername(username)
              .then(
                  function (user) {
                      res.json(user);
                      return;
                  }
              );
        } else {
            userModel.findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                        return;
                    }
                )

        }
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            userModel.findUserByCredentials(username,password)
                .then(
                    function (user) {
                        if(user && bcrypt.compareSync(password, user.password)){
                            return done(null, user);
                        }
                        else{
                            return done(null, false);
                        }
                    }
                );
        } else if(username) {

          userModel.findUserByUsername(username)
              .then(
                  function (user) {
                      res.json(user);
                      return;
                  }
              );
        } else {

            res.sendStatus(404);
            return;
        }
    }

    function deleteUser(req, res) {
        var userId = req.params['userId'];
            userModel.deleteUser(userId)
                .then(
                    function () {
                        res.sendStatus(200);
                        return;
                    });
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params['userId'];
        userModel.updateUser(userId,user)
            .then(function () {
                res.sendStatus(200);
                return;
            });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req,res) {
        res.json(req.user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }
    
    function loggedin(req,res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function checkAdmin(req,res) {
        res.send((req.isAuthenticated()&& req.user.roles.indexOf("ADMIN")>-1) ? req.user : '0');
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newFacebookUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            facebook: {
                                id:    profile.id,
                                token: token
                            },
                            roles: ['FAN']
                        };
                        return userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
        .then(
            function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }
        );
    }

    function unregister (req, res) {
        eventModel.removeAttendeeFromAllEvents(req.user._id)
            .then(function () {
                postModel.removeLike(req.user._id)
                    .then(
                        function () {
                            userModel
                                .deleteUser(req.user._id)
                                .then(
                                    function (user) {
                                        req.logout();
                                        res.sendStatus(200);
                                        return;
                                    }
                                );
                        }
                    )
            })

    }

    function findAllFollowers(req,res) {
        var userId = req.params['userId'];
        userModel.findAllFollowers(userId)
            .then(function (users) {
                res.json(users);
                return;
            });
    }

    function findAllFollowing(req,res) {
        var userId = req.params['userId'];
        userModel.findAllFollowing(userId)
            .then(function (users) {
                res.json(users);
                return;
            });
    }

    function addFollowing(req,res) {
        var followingId = req.params['followingId'];
        var user = req.body;
        userModel.addFollowing(user._id,followingId);
        return userModel.addFollower(followingId,user._id)
            .then(function (u) {
                res.send(u);
                return;
            });
    }

    function removeFollowing(req,res) {
        var followingId = req.params['followingId'];
        var user = req.body;
        userModel.removeFollowing(user._id,followingId);
        return userModel.removeFollower(followingId,user._id)
            .then(function (u) {
                res.send(u);
                return;
            });
    }


    function findAllEventsAttending(req,res) {
        var userId = req.params['userId'];
        return userModel.findAllEventsAttending(userId)
            .then(function (events) {
                res.send(events);
                return;
            })
    }

    function findUserByBitId(req,res) {
        var bitId = req.params['bitId'];
        return userModel.findUserByBitId(bitId)
            .then(function (user) {
                res.send(user);
                return;
            })
    }
    function findUserByBitName(req,res) {
        var bitName = req.params['bitName'];
        return userModel.findUserByBitName(bitName)
            .then(function (user) {
                res.send(user);
                return;
            })
    }




    function findPostByUser(req,res) {
        var userId = req.params['userId'];
        return postModel.findAllPostByArtist(userId)
            .then(function (response) {
                res.send(response);
                return;
            })
    }



