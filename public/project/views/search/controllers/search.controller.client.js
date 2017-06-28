(function () {
    angular
        .module('ConcertFever')
        .controller('SearchController',searchController);

        function searchController($location,currentUser,UserService,MusicService) {
            var model = this;

            model.searchArtistsByName = searchArtistsByName;
            model.searchBandsInTown = searchBandsInTown;
            model.searchArtist = searchArtist;
            model.eventsPresent = eventsPresent;
            model.logout = logout;
            model.isLinkedUser = isLinkedUser;
            model.follow = follow;
            model.unfollow = unfollow;

            function init() {
                setUser(currentUser);
            }

            init();

            function setUser(user) {
                model.user = user;
                model.userId = user._id;
                if(!model.user.anonymous){
                    isAdmin(user);
                }
            }

            function searchArtistsByName(searchText) {
                MusicService.searchArtistsByName(searchText)
                    .then(function (response) {
                        model.results = response.data.Artists;
                        model.artist = '';
                        if(model.results.length ===0){
                            model.apiError = 'We were not able to find any artists by the name '
                            + searchText +". Please try searching for another artist."
                        }
                        else{
                            model.apiError='';
                        }
                    });
            }

            function isAdmin(user) {
                model.isAdmin = user.roles.includes("ADMIN");
            }

            function isLinkedUser(bitArtistName) {
                UserService.findUserByBitName(bitArtistName)
                    .then(function (user) {
                        if(user.length > 0){
                            model.searchedUser = user[0];
                            model.isLinkedSearchUser = true;
                            model.showFollowButton = true;
                            renderFollowButton(user[0]._id);
                        }
                        else{
                            model.isLinkedSearchUser = false;
                            model.showFollowButton = '';
                        }
                    });
            }

            function searchArtist(searchText) {
                MusicService.searchArtist(searchText)
                    .then(function (response) {
                        console.log(response.data);
                        if(response.data !== undefined){
                            model.showFollowButton= '';
                            model.error = '';
                            model.artist =response.data;
                            if(!model.user.anonymous){
                                isLinkedUser(model.artist.name);
                            }
                        }

                    }, function () {
                        model.showFollowButton= '';
                        model.artist = '';
                        model.error = "Unable to find information on "+ searchText ;
                        model.searchedUser = false;

                    });
            }

            function searchBandsInTown(searchText) {
                MusicService.searchBandsInTown(searchText)
                    .then(function (response) {
                        console.log(response.data)
                        model.artist = response.data;
                    });
            }

            function follow(followingId) {
                return UserService.follow(model.user,followingId)
                    .then(function (user) {
                        renderFollowButton(followingId);
                    });
            }

            function unfollow(followingId) {
                return UserService.unfollow(model.user,followingId)
                    .then(function (user) {
                        renderFollowButton(followingId);
                    });
            }

            function renderFollowButton(followId) {
                UserService.findUserById(model.userId)
                    .then(function (user) {
                        model.showFollowValue = user.following.includes(followId)
                            && !model.user.anonymous && model.isLinkedSearchUser;
                    });
            }

            function eventsPresent(eventCount) {
                if(eventCount > 0){
                    model.events = "See upcoming concerts";
                    return true;
                }
            }
            function logout() {
                UserService
                    .logout()
                    .then(function () {
                        $location.url('/login');
                    });
            }
        }
    })
();
