(function () {
    angular
        .module('ConcertFever')
        .controller('ProfileController',profileController);
    
    function profileController($location,currentUser,UserService,MusicService) {

        var model = this;

        model.uid = currentUser._id;
        model.updateUser = updateUser;
        model.unregister = unregister;
        model.logout = logout;
        model.validateBitAccount = validateBitAccount;

        function init() {
            renderUser(currentUser);
            isArtist(currentUser);
            isUnlinkedUser(currentUser);
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
                        model.error = '';
                        model.artistImportMessage = '';
                        model.message = "User update was successful";
                        isUnlinkedUser(user);
                });
        }
        
        function unregister() {
            UserService
                .unregister()
                .then(
                    function () {
                        $location.url('/home');
                    },
                    function () {
                        model.error = "Unable to unregister user";
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

        function isArtist(user) {
            model.isArtist = user.roles.includes("ARTIST");
        }

        function isUnlinkedUser(user) {
            model.isUnlinkedBitUser = typeof user.bitId === 'undefined';
        }

        function validateBitAccount(bitName) {
            MusicService.searchArtist(bitName)
                .then(function (response) {
                    var user = response.data;
                    UserService.findUserByBitId(user.id)
                        .then(function (result) {
                            if(result.length === 0) {

                                model.user.firstName = user.name;
                                model.user.bitId = user.id;
                                model.user.bitName = user.name;
                                renderUser(model.user);
                                model.error="";
                                model.artistImportMessage = "Please verify the account details below and click update to save profile. You will not be allowed to edit this later."
                            }
                            else {
                                model.error = "Sorry this artist has already been linked to another user";
                            }
                        })


                },function () {
                    model.error = "Sorry this is not a valid Bandsintown artist name. Please try again.";
                })
        }
    }
})();