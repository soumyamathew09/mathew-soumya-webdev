(function () {
    angular
        .module('ConcertFever')
        .controller('ActivityController',activityController);

    function activityController($location,currentUser,UserService) {

        var model = this;

        model.userId = currentUser._id;
        model.follow = follow;
        model.unfollow = unfollow;
        model.searchUser = searchUser;
        model.renderFollowers = renderFollowers;
        model.renderFollowing = renderFollowing;
        model.renderAttending = renderAttending;
        model.showFollowingUsersActivity =showFollowingUsersActivity;

        function init() {
            renderUser(currentUser);
        }
        init();

        function renderUser(user) {
            model.user = user;
        }

        function renderFollowers(userId) {
            UserService.findAllFollowers(userId)
                .then(function (followers) {
                    if(followers.length >0){
                        model.followersMsg= "You currently have "+ followers.length+" followers";
                        model.nofollowersMsg= "";
                        model.followers = followers;
                    }
                    else{
                        model.nofollowersMsg= "You currently have no followers"
                    }
                })
        }

        function renderFollowing(userId) {
            UserService.findAllFollowing(userId)
                .then(function (following) {
                    if(following.length >0){
                        model.followingMsg= "You currently have"+ following.length+" followers";
                        model.nofollowingMsg='';
                        model.following = following;}
                    else {
                        model.nofollowingMsg= "You are currently not following anyone"
                    }
                });
        }

        function follow(followingId) {
            return UserService.follow(model.user,followingId)
                .then(function () {
                    renderFollowing(model.userId);
                    renderFollowButton(followingId);
                });
        }

        function unfollow(followingId) {
            return UserService.unfollow(model.user,followingId)
                .then(function () {
                    renderFollowing(model.userId);
                    renderFollowButton(followingId);

                });
        }
        function renderFollowButton(followId) {
            UserService.findUserById(model.userId)
                .then(function (user) {
                    model.searchedUser.alreadyFollowing = user.following.includes(followId);
                });
        }

        function renderAttending(userId) {
            UserService.findAllEventsAttending(userId)
                .then(function (events) {
                    if(events.length > 0){
                        model.eventsMessage = "You have "+events.length +" upcoming events";
                        model.noEventsMessage = '';
                        model.events = events;
                    }
                    else {
                        model.noEventsMessage = "You have no upcoming events";
                    }
                })
        }

        function searchUser(searchName) {
            UserService.findUserByUsername(searchName)
                .then(function (user) {
                    if(user !== null){
                        model.searchedUser = user;
                        renderFollowButton(user._id);
                        model.searchResult='';
                    }
                    else{
                        model.searchResult = "There is no user with the username " + searchName +
                                ". Please check the the name and try again."
                    }
                });
        }


        function showFollowingUsersActivity() {
            $location.url('/following');
        }


    }
})();