
(function () {
    angular
        .module('WebAppMaker')
        .service('UserService',userService);
    
    function userService($http) {

        this.createUser = createUser;
        this.findUserById = findUserById;
        this.findUserByCredentials = findUserByCredentials;
        this.findUserByUsername = findUserByUsername;
        this.updateUser = updateUser;
        this.deleteUser = deleteUser;
        this.login = login;
        this.logout = logout;
        this.register = register;
        this.loggedin = loggedin;


        function findUserByCredentials(username, password) {
            var url = '/api/assignment/user?&username=' + username + '&password=' + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = '/api/assignment/user/' + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/assignment/user?username="+username;
            return $http.get(url)
                        .then(function (response) {
                            return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/assignment/user";
            return $http.post(url,user)
                        .then(function (response) {
                            return response.data;
                        });
        }

        function updateUser(userId, user) {
            var url = "/api/assignment/user/"+userId;
            return $http.put(url,user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/api/assignment/user/"+userId;
            return $http.delete(url)
                .then(
                    function (response) {
                        return response.data;
                    }
                );
        }

        function login(user) {
            var url = "/api/assignment/login";

            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout(user) {
            var url = "/api/assignment/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function register(user) {
            var url = "/api/assignment/register";
            return $http.post(url,user)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function loggedin() {
            var url = "/api/assignment/loggedin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();
