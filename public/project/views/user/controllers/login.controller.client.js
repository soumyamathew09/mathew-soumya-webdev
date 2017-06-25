(function () {
    angular
        .module('ConcertFever')
        .controller('LoginController',loginController);
    
    function loginController($location,UserService) {

        var model = this;
        model.login = login;
        model.logout = logout;

        function login (username,password) {

           if (typeof username === "undefined" || typeof password === "undefined"){
               model.message = "Please enter username and password";
           }
           else {
               var user = {
                   username: username,
                   password: password
               }

               UserService
                   .login(user)
                   .then(function (found) {
                           if (found !== null) {
                               var user = found;
                               $location.url("/profile");
                           } else {
                               model.message = "Incorrect username or password. Please try again.";
                           }
                       },
                       function () {
                           model.message = "Incorrect username or password. Please try again.";
                       }
                   );
           }
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $location.url("/");
                    });
        }

    }
})();
