(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController',loginController);
    
    function loginController($location,userService) {

        var model = this;


        model.login = login;

        function login (username,password) {
            var found = userService.findUserByCredentials(username,password);
            if(found !== null){
                $location.url('/user/' + found._id)
            }else {
                model.message = "incorrect";
            }
        }
    }
})();