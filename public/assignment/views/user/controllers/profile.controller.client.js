(function () {
    angular
        .module('WebAppMaker')
        .controller('ProfileController',profileController);
    
    function profileController($location,currentUser,UserService) {

        var model = this;

        model.uid = currentUser._id;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        function init() {
            renderUser(currentUser);
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

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }
})();