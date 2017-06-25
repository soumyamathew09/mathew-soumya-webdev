(function () {
    angular
        .module('ConcertFever')
        .controller('ActivityController',activityController);

    function activityController($location,currentUser,UserService) {

        var model = this;

        model.userId = currentUser._id;
        model.addFollower = addFollower;
        model.searchUser = searchUser;
        model.renderFollowers = renderFollowers;
        model.renderFollowing = renderFollowing;
        model.renderAttending = renderAttending;

        function init() {
            renderUser(currentUser);
        }
        init();

        function renderUser(user) {
            model.user = user;
        }

        /*function renderAllUsers() {
            UserService.findAllUsers()
                .then(function (users) {
                    model.allUsers = users;
                })
        }*/
        function renderFollowers(userId) {
            UserService.findAllFollowers(userId)
                .then(function (followers) {
                    model.followers = followers;
                })
        }

        function renderFollowing(userId) {
            UserService.findAllFollowing(userId)
                .then(function (following) {
                    model.following = following;
                });
        }

        function addFollower(followingId) {
            return UserService.updateFollowers(model.user,followingId)
                .then(function (user) {
                    renderFollowing(user._id);
                });
        }

        function renderAttending(userId) {
            UserService.findAllEventsAttending(userId)
                .then(function (events) {
                    model.events = events;
                })
        }

        function searchUser(searchName) {
            UserService.findUserByUsername(searchName)
                .then(function (user) {
                   model.allUsers = user;
                });
        }





    }
})();