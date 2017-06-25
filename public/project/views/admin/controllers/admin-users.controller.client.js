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
                    model.user={};
                });
        }

        function deleteUser(userId) {
            UserService.deleteUser(userId)
                .then( renderAllUsers);
        }

        function createUser(user) {
            UserService.createUser(user)
                .then(renderAllUsers)
        }

        function selectUser(user) {
            model.user = angular.copy(user);
        }

        function updateUser(user) {
            UserService.updateUser(user._id,user)
                .then(renderAllUsers());
        }

    }
})();