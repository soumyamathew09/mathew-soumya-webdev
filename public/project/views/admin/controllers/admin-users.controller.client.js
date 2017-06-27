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
            if( userId !== currentUser._id){
                UserService.deleteUser(userId)
                    .then( renderAllUsers());
            }
            else{
                model.error= 'You cannot delete yourself, please go to your profile page and unregister to delete your account'
            }
        }

        function createUser(newUser) {
            if (! newUser.username) {
                showErrorMessage('You must enter a username for the new user');
            }
            else if(typeof newUser.roles === "undefined"){
                showErrorMessage('You must select a role for the new user');
            }
            else {
                UserService
                    .findUserByUsername(newUser.username)
                    .then(
                        function (user) {
                            if (user !== null) {
                                showErrorMessage('Sorry this username is taken');
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
        }

        function showErrorMessage(text){
            model.error = text;
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