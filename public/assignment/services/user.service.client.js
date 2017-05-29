(function () {
    angular
        .module('WebAppMaker')
        .service('UserService',userService);
    
    function userService() {

        this.createUser = createUser;
        this.findUserById = findUserById;
        this.findUserByCredentials = findUserByCredentials;
        this.findUserByUsername = findUserByUsername;
        this.updateUser = updateUser;
        this.deleteUser = deleteUser;

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

    function updateUser(userId, user) {
        var u = findUserById(userId);
        var index = users.indexOf(u);

        users.splice(index,1);
        u.firstName = user.firstName;
        u.lastName = user.lastName;
        u.email = user.email;

        users.push(u);
    }

    function deleteUser(userId){
        var user = findUserById(userId);
        var index = users.indexOf(user);
        users.splice(index,1);
    }

    
})();