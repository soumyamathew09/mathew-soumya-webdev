    var app = require('../../express');
    var userModel = require('../model/user/user.model.server');

    app.get ('/api/assignment/user/:userId', findUserById);
    app.get ('/api/assignment/user', findAllUsers);
    app.post('/api/assignment/user', createUser);
    app.put ('/api/assignment/user/:userId', updateUser);
    app.delete ('/api/assignment/user/:userId', deleteUser);

    function createUser(req, res) {

        var user = req.body;

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
                        res.json(user);
                        return;
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
            res.json(users);
        }
    }

    function deleteUser(req, res) {
        var userId = req.params['userId'];
            userModel.deleteUser(userId)
                .then(
                    function () {
                        res.sendStatus(200);
                        return;
                    }
                , res.sendStatus(404))

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

