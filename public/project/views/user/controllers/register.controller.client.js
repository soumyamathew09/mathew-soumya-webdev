(function () {
    angular
        .module('ConcertFever')
        .controller('RegisterController',registerController);

    function registerController($location,UserService) {

        var model = this;
        model.register = register;

        function register (username,password,password2,userType) {
            if(typeof userType === "undefined"){
                model.error = "Please set your user type to be FAN or ARTIST";
            }
            else
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
                                    registerNewUser(username, password,userType);
                                }
                            },
                            function () {
                                registerNewUser(username, password,userType);
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

            function registerNewUser(username,password,userType) {
                var newUser = {
                    username: username,
                    password: password,
                    roles: userType
                };
                UserService.register(newUser)
                    .then(function (newUser) {
                        $location.url('/profile');
                    });
            }
    }
})();