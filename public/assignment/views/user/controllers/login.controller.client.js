(function () {
    angular
        .module('WebAppMaker')
        .controller('LoginController',loginController);
    
    function loginController($location,UserService) {

        var model = this;
        model.login = login;

        function login (username,password) {
            var found = UserService.findUserByCredentials(username,password);
            if(found !== null){
                $location.url('/user/' + found._id)
            }else {
                model.message = "Incorrect username or password. Please try again.";
            }
        }
    }
})();