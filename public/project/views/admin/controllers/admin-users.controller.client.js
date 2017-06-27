(function () {
    angular
        .module('ConcertFever')
        .controller('AdminUsersController',adminUsersController);

    function adminUsersController($location,currentUser,UserService) {

        var model = this;

        model.uid = currentUser._id;
        model.deleteUser = deleteUser;
        model.createUser = createUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;

        function init() {
            renderAllUsers();

        }
        init();

        function renderAllUsers() {
            UserService.findAllUsers()
                .then(function (users) {
                    model.users = users;
                    model.newuser={};
                    model.user = {};
                    model.error='';
                });
        }
        function renderAllUsersAfterCreate() {
            UserService.findAllUsers()
                .then(function (users) {
                    model.users = users;
                    model.newuser={};
                    model.error='';
                });
        }
        function renderAllUsersAfterUpdate() {
            UserService.findAllUsers()
                .then(function (users) {
                    model.users = users;
                    model.user={};
                    model.error='';
                });
        }

        function deleteUser(userId) {
            UserService.deleteUser(userId)
                .then( renderAllUsers());
        }

        function createUser(newUser) {
            UserService
                .findUserByUsername(newUser.username)
                .then(
                    function (user) {
                        if (user !== null) {
                            showErrorMessage();
                        }
                        else {
                            UserService.createUser(newUser)
                                .then(renderAllUsersAfterCreate());
                        }
                    },
                    function () {
                        UserService.createUser(newUser)
                            .then(renderAllUsersAfterCreate());
                    }
                );

        }

        function showErrorMessage(){
            model.error = 'Sorry this username is taken';
            return;
        }

        function selectUser(user) {
            model.user = angular.copy(user);
        }

        function updateUser(user) {
            UserService.updateUser(user._id,user)
                .then(renderAllUsersAfterUpdate());
        }

    }
})();