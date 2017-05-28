(function () {
    angular
        .module('WebAppMaker')
        .service('userService',userService);
    
    function userService() {
        this.createUser = createUser;
        this.findUserById = findUserById;
        this.findUserByCredentials = findUserByCredentials;
        this.findUserByUsername = findUserByUsername;

    }

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function findUserByCredentials(username,password) {
        var found = null;
        for (var u in users){
            var user = users[u];
            if(user.username === username && user.password === password) {
                found = user;
                break;
            }
        }
        return found;
    }
    function findUserById(userId) {
        for(var u in users) {
            if(users[u]._id === userId){
                return users[u]
            }
        }
    }
    function findUserByUsername(username) {
        var user = users.find(function (user) {
            return user.username === username;
        });
        if(typeof user === 'undefined'){
            return null;
        }
        return user;
    }

    function createUser(user) {
        user._id = (new Date()).getTime() + "";
        user.created = new Date();
        users.push(user);
        return user;
    }


    
})();