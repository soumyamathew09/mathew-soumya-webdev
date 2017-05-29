(function () {
    angular
        .module('WebAppMaker')
        .controller('ProfileController',profileController);
    
    function profileController($location,$routeParams,UserService) {

        var model = this;

        var uid = $routeParams['uid'];
        model.uid = uid
        model.updateUser = updateUser;

        function init() {
            model.user = UserService.findUserById(uid);
        }
        init();

        function updateUser(uid,user) {
            UserService.updateUser(uid,user);
            $location.url('/user/' + uid)
        }

    }
})();