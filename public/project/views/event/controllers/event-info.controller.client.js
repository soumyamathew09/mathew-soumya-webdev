(function(){
    angular.module('ConcertFever')
        .controller('EventInfoController',eventInfoController);

    function eventInfoController($routeParams,currentUser,$location,UserService,EventService,PostService) {

        var model = this;

        model.userId = currentUser._id;
        model.eventId = $routeParams['eventId'];
        model.artistName = $routeParams['artistId'];
        model.attendingEvent = attendingEvent;
        model.createPost = createPost;
        model.deletePost = deletePost;
        model.notAttendingEvent=notAttendingEvent;
        model.likePost = likePost;

        function init(){

            EventService
                .findEventInfo(model.artistName,model.eventId)
                .then(renderEvent);
            isFan(currentUser);
            isArtist(currentUser);
            renderPosts(model.userId,model.eventId);

        }

        init();

        function renderEvent(event) {
            model.event = event;
            isAttending();
        }

        function attendingEvent() {
            EventService.addAttendee(model.userId,model.eventId)
                .then(function () {
                    renderAttendingStatus();
                });
        }

        function notAttendingEvent() {
            EventService.removeAttendee(model.userId,model.eventId)
                .then(function () {
                    renderAttendingStatus();
                })
        }


        function isFan(user) {
            model.isFan = user.roles.includes("FAN");
        }

        function isArtist(user) {
            model.isArtist= user.roles.includes("ARTIST");
        }

        function createPost(post) {
            PostService.createPost(model.userId,model.eventId,post)
            .then(function () {
                renderPosts(model.userId,model.eventId);
                model.newPost.description = '';
            })
        }

        function renderPosts(userId,eventId) {
            if(model.isArtist) {
                PostService.findAllPostByArtistForEvent(userId, eventId)
                    .then(function (posts) {
                        model.posts = posts;
                    });
            }
            else
                if(model.isFan){
                PostService.findAllPostForEvent(eventId)
                    .then(function (posts) {
                        setUsernameForPosts(0,posts);
                    });
                }
        }
        
        function renderAttendingStatus() {
            isAttending();
        }

        function isAttending() {
            EventService.findEventById(model.eventId)
                .then(function (event) {
                   model.isAttending = event.attendees.includes(model.userId);
                });
        }

        function deletePost(postId) {
            PostService
                .deletePost(postId)
                .then(function () {
                    renderPosts(model.userId,model.eventId);
                });

        }

        function likePost(postId) {
            PostService
                .likePost(postId,model.userId)
                .then(function () {
                    renderPosts(model.userId,model.eventId);
                });

        }


        function setUsernameForPosts(index,posts) {
            if(index<posts.length){
                UserService.findUserById(posts[index]._user)
                    .then(function (user) {
                        posts[index].username = user.username;
                        index = index+1;
                        setUsernameForPosts(index,posts);
                    });
            }
            else
            {
                model.posts = posts;
            }

        }


    }
})();