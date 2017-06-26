(function () {
    angular
        .module('ConcertFever')
        .controller('FollowingController',followingController);

    function followingController($location,currentUser,UserService,EventService,PostService) {

        var model = this;

        model.userId = currentUser._id;
        model.follow = follow;
        model.unfollow = unfollow;
        model.userInfoUrl=userInfoUrl;
        model.searchUser = searchUser;
        model.likePost = likePost;
        model.unlikePost = unlikePost;

        function init() {
            renderUser(currentUser);
            renderFollowing();
        }
        init();

        function renderUser(user) {
            model.user = user;
        }


        function renderFollowing() {
            UserService.findAllFollowing(currentUser._id)
                .then(function (following) {
                    model.following = following;
                    model.usersInfo = [];
                    renderFollowingUsersInformation(0,model.following);

                });
        }

        function searchUser(searchName) {
            UserService.findUserByUsername(searchName)
                .then(function (user) {
                    if(user !== null){
                        model.searchedUser = user;
                        renderFollowButton(user);
                        model.searchResult='';
                    }
                    else{
                        model.searchResult = "There is no user with the username " + searchName +
                            ". Please check the the name and try again."
                    }
                });
        }

        function renderFollowingUsersInformation(index,users) {
           if(index<users.length){
                var user = users[index];
                if(user.roles.includes("FAN")){
                    if(user.attending.length >0){
                        EventService.findEventById(user.attending[user.attending.length-1])
                            .then(function (event) {
                                var activity ={
                                    username: user.username,
                                    role: "FAN",
                                    event: event
                                }
                                model.usersInfo.push(activity);
                                index= index+1;
                                renderFollowingUsersInformation(index,users)
                            });
                    }
                }
                else if(user.roles.includes("ARTIST")){
                    PostService.findAllPostByArtist(user._id)
                        .then(function (posts) {
                            if(posts.length >0){
                                var p = posts[0];
                                EventService.findEventById(p._event)
                                    .then(function (event) {
                                        var activity ={
                                            username: user.username,
                                            artistName: user.bitName,
                                            role: "ARTIST",
                                            event: event,
                                            post: p,
                                            liked: p.likes.includes(model.userId)
                                        }
                                        model.usersInfo.push(activity);
                                        index= index+1;
                                        renderFollowingUsersInformation(index,users)
                                    });
                            }
                        })
                }
                else {
                    index= index+1;
                    renderFollowingUsersInformation(index,users);
                }
            }
            else{
               return model.usersInfo;
           }
        }

        function follow(followingId) {
            return UserService.follow(model.user,followingId)
                .then(function (user) {
                    renderFollowing(model.userId);
                    renderFollowButton(followingId);
                });
        }

        function unfollow(followingId) {
            return UserService.unfollow(model.user,followingId)
                .then(function (user) {
                    renderFollowing(model.userId);
                    renderFollowButton(followingId);
                });
        }
        function userInfoUrl(user) {
            if (user.role ==='FAN' || user.role==='ARTIST') {
                var url = 'views/user/templates/user-'+ user.role.toLowerCase()+'.view.client.html';
            }
            return url;
        }

        function renderFollowButton(followId) {
            UserService.findUserById(model.userId)
                .then(function (user) {
                    model.searchedUser.alreadyFollowing = user.following.includes(followId);
                });
        }

        function likePost(postId) {
            PostService.likePost(postId,model.userId)
                .then(function () {
                    renderFollowing();
                })

        }

        function unlikePost(postId) {
            PostService.unlikePost(postId,model.userId)
                .then(function () {
                    renderFollowing();
                })
        }

    }
})();