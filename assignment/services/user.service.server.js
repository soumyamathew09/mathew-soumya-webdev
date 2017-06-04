    var app = require('../../express');

    app.get ('/api/assignment/user/:userId', findUserById);
    app.get ('/api/assignment/user', findAllUsers);
    app.post('/api/assignment/user', createUser);
    app.put ('/api/assignment/user/:userId', updateUser);
    app.delete ('/api/assignment/user/:userId', deleteUser);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function createUser(req, res) {

        var user = req.body;
        user._id = (new Date()).getTime() + "";
        user.created = new Date();
        users.push(user);
        res.json(user);
        return;

    }

    function findUserById(req, res) {
        var userId = req.params['userId'];
        for(var u in users) {
            if(users[u]._id === userId) {
                res.send(users[u]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function findAllUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            for(var u in users) {
                var user = users[u];
                if( user.username === username &&
                    user.password === password) {
                    res.json(user);
                    return;
                }
            }
            res.sendStatus(404);
            return;
        } else if(username) {
            for(var u in users) {
                var user = users[u];
                if( user.username === username) {
                    res.json(user);
                    return;
                }
            }
            res.sendStatus(404);
            return;
        } else {
            res.json(users);
        }
    }

    function deleteUser(req, res) {
        var userId = req.params['userId'];
            for(var u in users){
                if(users[u]._id === userId){
                    users.splice(u, 1);
                    res.sendStatus(200);
                    return;
                }
            }
        res.sendStatus(404);
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params['userId'];
        for(var u in users) {
            if(users[u]._id === userId) {
                users[u].firstName = user.firstName;
                users[u].lastName = user.lastName;
                users[u].email = user.email;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);

    }

