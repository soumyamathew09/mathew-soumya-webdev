(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController',registerController);

    function registerController($location,userService) {

        var model = this;


        model.register = register;

        function register (username,password,password2) {
            var found = userService.findUserByUsername(username);
            if(found != null || password == null || password!== password2 ||
                typeof password === 'undefined'){
                model.error = 'sorry this username is taken';
            }else {
                var newUser = {
                    username: username,
                    password: password
                };
                newUser = userService.createUser(newUser)
                $location.url('/user/' + newUser._id)
            }
        }
    }
})();