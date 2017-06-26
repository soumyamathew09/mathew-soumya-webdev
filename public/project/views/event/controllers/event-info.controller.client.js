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
        model.unlikePost = unlikePost;

        function init(){

            EventService
                .findEventInfo(model.artistName,model.eventId)
                .then(renderEvent);


        }

        init();

        function renderEvent(event) {
            model.event = event;
            isFan(currentUser);
            isArtist(currentUser);
            isAttending();
            renderAttendeeCount();
            renderPosts(model.userId,model.eventId);
        }

        function attendingEvent() {
            EventService.addAttendee(model.userId,model.eventId)
                .then(function () {
                    renderAttendingStatus();
                    renderAttendeeCount();
                });
        }

        function notAttendingEvent() {
            EventService.removeAttendee(model.userId,model.eventId)
                .then(function () {
                    renderAttendingStatus();
                    renderAttendeeCount();
                })
        }


        function isFan(user) {
            model.isFan = user.roles.includes("FAN");
        }

        function isArtist(user) {
            if(user.roles.includes("ARTIST")){
                if (currentUser.bitId == model.event.artist_id){
                            model.isArtist = true;
                        }
                        else{
                            model.isFan = true;
                        }
            }
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
                        if(posts.length ===0){
                            model.noPosts = "You have not posted for this event before.Click below to " +
                                "post something new";
                        }
                        else {
                            setLikedStatus(posts);
                        }
                    });
            }
            else
                if(model.isFan){
                PostService.findAllPostForEvent(eventId)
                    .then(function (posts) {
                        if(posts.length ===0){
                            model.noPosts = "The artists are too busy touring and haven't had any time " +
                                "to post yet."
                        }
                        else{
                            setUsernameForPosts(0,posts);
                        }
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

        function renderAttendeeCount() {
            EventService.findEventById(model.eventId)
                .then(function (event) {
                    model.event.attendeeCount = event.attendees.length;
                })
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

        function unlikePost(postId) {
            PostService
                .unlikePost(postId,model.userId)
                .then(function () {
                    renderPosts(model.userId,model.eventId);
                });

        }

        function setLikedStatus(posts) {
            for(var p=0;p<posts.length;p++){
                posts[p].isLiked = posts[p].likes.includes(model.userId);
            }
            model.posts = posts;
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
                setLikedStatus(posts);
            }

        }


    }
})();