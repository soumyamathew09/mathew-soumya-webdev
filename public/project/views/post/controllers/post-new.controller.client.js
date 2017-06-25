(function(){
    angular.module('ConcertFever')
        .controller('NewPostController',newPostController);

    function newPostController($routeParams,currentUser,$location,PostService) {

        var model = this;

        model.userId = currentUser._id;
        model.artistName = $routeParams['artistId'];
        model.eventId = $routeParams['eventId'];
        model.createPost = createPost;


        function createPost(eventId,post) {
            if(typeof post === "undefined" || post.description === null || post.description === '') {
                model.error = "Please enter some content for your new post";
            }
            else {
                PostService
                    .createPost(model.userId,eventId, post)
                    .then(function () {
                        $location.url('/artist/'+model.artistName+'/event/' + model.eventId );
                    });
            }
        }

    }
})();