(function () {
    angular
        .module('WebAppMaker')
        .controller('RegisterController',registerController);

    function registerController($location,UserService) {

        var model = this;
        model.register = register;

        function register (username,password,password2) {
            var found = UserService.findUserByUsername(username);
            if(found != null){
                model.error = 'sorry this username is taken';
            }
            else if(password == null || password!== password2 ||
                typeof password === 'undefined'){
                model.error = 'please check your password and try again';
            }

            else {
                var newUser = {
                    username: username,
                    password: password
                };
                newUser = UserService.createUser(newUser)
                $location.url('/user/' + newUser._id)
            }
        }
    }
})();