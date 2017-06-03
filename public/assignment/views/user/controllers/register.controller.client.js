(function () {
    angular
        .module('WebAppMaker')
        .controller('RegisterController',registerController);

    function registerController($location,UserService) {

        var model = this;
        model.register = register;



        function register (username,password,password2) {
            UserService
                .findUserByUsername(username)
                .then(
                    showErrorMessage,
                    registerNewUser(username,password)
                )

        };

            function showErrorMessage(){
                model.error = 'sorry this username is taken';
            }

            function registerNewUser(username,password) {
                var newUser = {
                    username: username,
                    password: password
                };
                UserService.createUser(newUser)
                    .then(function (newUser) {
                        $location.url('/user/'+ newUser._id);
                    });
            }
    }
})();