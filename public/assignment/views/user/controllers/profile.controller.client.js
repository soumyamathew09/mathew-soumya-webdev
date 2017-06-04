(function () {
    angular
        .module('WebAppMaker')
        .controller('ProfileController',profileController);
    
    function profileController($location,$routeParams,UserService) {

        var model = this;

        var uid = $routeParams['uid'];
        model.uid = uid
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            UserService.findUserById(uid)
                .then(renderUser ,userError);
        }
        init();

        function renderUser(user) {
            model.user = user;
        }

        function userError(error) {
            model.error = "User not found";
        }

        function updateUser(user) {
            UserService
                .updateUser(user._id,user)
                .then(
                    function(){
                        model.message = "User update was successful";
                });
        }
        
        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(
                    function () {
                        $location.url('/login');
                    },
                    function () {
                        model.error("Unable to unregister user");
                    }
                );
        }
    }
})();