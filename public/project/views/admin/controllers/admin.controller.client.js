(function () {
    angular
        .module('ConcertFever')
        .controller('AdminController',adminController);

    function adminController($location,currentUser,UserService) {

        var model = this;

        model.uid = currentUser._id;

        function init() {
            renderAllUsers();

        }
        init();

        function renderAllUsers() {
            UserService.findAllUsers()
                .then(function (users) {
                    model.users = users;
                });
        }


    }
})();