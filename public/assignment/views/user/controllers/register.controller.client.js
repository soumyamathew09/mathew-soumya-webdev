(function () {
    angular
        .module('WebAppMaker')
        .controller('RegisterController',registerController);

    function registerController($location,UserService) {

        var model = this;
        model.register = register;

        function register (username,password,password2) {
            if (typeof username !== "undefined" && typeof password !== "undefined" && typeof password2 !== "undefined") {
                if (password !== password2) {
                    model.error = "Your passwords do not match";
                }
                else {
                    UserService
                        .findUserByUsername(username)
                        .then(
                            function (user) {
                                if (user !== null) {
                                    showErrorMessage();
                                }
                                else {
                                    registerNewUser(username, password);
                                }
                            },
                            function () {
                                registerNewUser(username, password);
                            }
                        );
                }
            }
            else{
                model.error = "Please enter all required fields"
            }

        }

            function showErrorMessage(){
                model.error = 'Sorry this username is taken';
                return;
            }

            function registerNewUser(username,password) {
                var newUser = {
                    username: username,
                    password: password
                };
                UserService.register(newUser)
                    .then(function (newUser) {
                        $location.url('/profile');
                    });
            }
    }
})();