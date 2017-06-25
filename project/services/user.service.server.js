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
        clientID     : "1449805858430487",
        clientSecret : "701a198621ad54693c565d9ffc3735eb",
        callbackURL  : "http://127.0.0.1:3000/auth/facebook/callback",
        profileFields: ['email','id','name','displayName']
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    app.get ('/api/project/user/:userId', findUserById);
    app.get ('/api/project/bituser/:bitId', findUserByBitId);
    app.get ('/api/project/admin/user',isAdmin, findAllUsers);
    app.get ('/api/project/user', findUser);
    app.post('/api/project/user',isAdmin, createUser);
    app.put('/api/project/follow/:followerId', updateFollowers);
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
            successRedirect: '/project/index.html#!/profile',
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
        user.password = bcrypt.hashSync(user.password);
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
                            }
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

    function updateFollowers(req,res) {
        var followerId = req.params['followerId'];
        var user = req.body;
        userModel.updateFollowers(user._id,followerId);
        return userModel.updateFollowing(user._id,followerId)
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



    function findPostByUser(req,res) {
        var userId = req.params['userId'];
        return postModel.findAllPostByArtist(userId)
            .then(function (response) {
                res.send(response);
                return;
            })
    }

    function findFollowingUsersInformation(req,res) {
        var userId = req.params['userId'];
        var results = [];
        return userModel.findAllFollowing(userId)
            .then(function (users) {
                for(var u=0;u<users.length;u++){
                    var user = users[u];
                    if(user.roles.includes("FAN")){
                        if(user.attending.length >0){
                            postModel.findAllPostByArtist(userId)
                            //return eventModel.findEventById(user.attending[length-1])
                                .then(function (event) {
                                    var activity ={
                                        username: user.name,
                                        role: "FAN",
                                        event: event
                                    }
                                    results.push(activity);
                                });
                        }
                    }
                    else
                        if(user.roles.includes("ARTIST")){
                        postModel.findAllPostByArtist(user._id)
                            .then(function (posts) {
                                if(posts.length >0){
                                    eventModel.findEventById(posts[0]._event)
                                        .then(function (event) {
                                            var activity ={
                                                username: user.name,
                                                role: "ARTIST",
                                                event: event,
                                                post: posts[0].description
                                            }
                                            results.push(activity);
                                        });
                                }
                            })

                    }
                }
                res.json(results);
                return;
            });
    }


