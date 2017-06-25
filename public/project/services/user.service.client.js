
(function () {
    angular
        .module('ConcertFever')
        .service('UserService',userService);
    
    function userService($http) {

        this.createUser = createUser;
        this.findAllUsers = findAllUsers;
        this.findUserById = findUserById;
        this.findUserByCredentials = findUserByCredentials;
        this.findUserByUsername = findUserByUsername;
        this.updateUser = updateUser;
        this.deleteUser = deleteUser;
        this.login = login;
        this.logout = logout;
        this.register = register;
        this.unregister = unregister;
        this.loggedin = loggedin;
        this.checkAdmin = checkAdmin;
        this.findAllFollowers = findAllFollowers;
        this.findAllFollowing = findAllFollowing;
        this.updateFollowers = updateFollowers;
        this.findAllEventsAttending = findAllEventsAttending;
        this.findUserByBitId = findUserByBitId;
        this.findFollowingUsersInformation = findFollowingUsersInformation;


        function findUserByCredentials(username, password) {
            var url = '/api/project/user?&username=' + username + '&password=' + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = '/api/project/user/' + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/project/user?username="+username;
            return $http.get(url)
                        .then(function (response) {
                            return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/project/user";
            return $http.post(url,user)
                        .then(function (response) {
                            return response.data;
                        });
        }

        function updateUser(userId, user) {
            var url = "/api/project/user/"+userId;
            return $http.put(url,user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/api/project/user/"+userId;
            return $http.delete(url)
                .then(
                    function (response) {
                        return response.data;
                    }
                );
        }

        function login(user) {
            var url = "/api/project/login";

            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout(user) {
            var url = "/api/project/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function register(user) {
            var url = "/api/project/register";
            return $http.post(url,user)
                .then(function (response) {
                    return response.data;
                });
        }
        function unregister(user) {
            var url = "/api/project/unregister";
            return $http.post(url,user)
                .then(function (response) {
                    return response.data;
                });
        }

        function loggedin() {
            var url = "/api/project/loggedin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkAdmin() {
            var url = "/api/project/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllFollowers(userId) {
            var url = '/api/project/followers/' + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllFollowing(userId) {
            var url = '/api/project/following/' + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function findAllUsers() {
            var url = '/api/project/admin/user';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateFollowers(user,followerId) {
            var url = '/api/project/follow/'+followerId;
            return $http.put(url,user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllEventsAttending(userId) {
            var url = '/api/project/attend/'+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByBitId(bitId) {
            var url = '/api/project/bituser/'+bitId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findFollowingUsersInformation(userId) {
            var url = '/api/project/followingInfo/' + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();
