(function () {
    angular
        .module('ConcertFever')
        .controller('HomeController',homeController);

    function homeController($location,currentUser,UserService,MusicService,EventService,PostService) {

        var model = this;

        model.user = currentUser;
        model.updateUser = updateUser;
        model.unregister = unregister;
        model.logout = logout;
        model.validateBitAccount = validateBitAccount;
        model.userHome=userHome;
        model.fetchArtistEvents = fetchArtistEvents;

        function init() {
            renderUser(currentUser);

        }
        init();

        function renderUser(user) {
            model.user = user;
            if(!model.user.anonymous){
                isArtist(currentUser);
                isFan(currentUser);
                isUnlinkedUser(currentUser);
            }
            else{
                fetchNewArtists();

            }
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

        function fetchNewArtists() {
            UserService.findNewArtists()
                .then(function (artists) {
                    model.newArtists = artists;
                })


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

        function isFan(user) {
            model.isFan = user.roles.includes("FAN");
            renderFollowing();
        }

        function isUnlinkedUser(user) {
            model.isUnlinkedBitUser = typeof user.bitId === 'undefined';
        }

        function userHome(isAnonymous) {
            if(isAnonymous){
                var url = 'views/home/templates/home-anonymous.view.client.html';
                return url;
            }
            else{
                var url = 'views/home/templates/home-logged-in.view.client.html';
                return url;
            }
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

        function renderFollowing() {
            UserService.findAllFollowing(currentUser._id)
                .then(function (following) {
                    model.following = following;
                    model.followingArtists = [];
                    renderFollowingUsersInformation(0,model.following);

                });
        }

        function renderFollowingUsersInformation(index,users) {
            if(index<users.length){
                var user = users[index];
                if(user.roles.includes("ARTIST")){
                    PostService.findAllPostByArtist(user._id)
                        .then(function (posts) {
                            if(posts.length >0){
                                var p = posts[0];
                                EventService.findEventById(p._event)
                                    .then(function (event) {
                                        var activity ={
                                            username: user.username,
                                            artistName: user.bitName,
                                            imageURL :user.imageURL,
                                            role: "ARTIST",
                                            event: event,
                                            post: p,
                                            liked: p.likes.includes(model.userId)
                                        }
                                        model.followingArtists.push(activity);
                                        index= index+1;
                                        renderFollowingUsersInformation(index,users)
                                    });
                            }
                            else {
                                var activity ={
                                    username: user.username,
                                    artistName: user.bitName,
                                    imageURL :user.imageURL,
                                    role: "ARTIST"
                                }
                                model.followingArtists.push(activity);
                                index= index+1;
                                renderFollowingUsersInformation(index,users)
                            }
                        })
                }
                else {
                    index= index+1;
                    renderFollowingUsersInformation(index,users);
                }
            }
            else{
                return model.followingArtists;
            }
        }

        function fetchArtistEvents(artistName) {
            $location.url("/artist/"+artistName+"/event");
        }
    }
})();