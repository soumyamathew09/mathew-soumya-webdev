(function(){
    angular.module('ConcertFever')
        .controller('EditPostController',editPostController);

    function editPostController($routeParams,currentUser,$location,PostService) {

        var model = this;

        model.userId = currentUser._id;
        model.artistName = $routeParams['artistId'];
        model.eventId = $routeParams['eventId'];
        model.postId = $routeParams['postId'];
        model.deletePost = deletePost;
        model.updatePost = updatePost;

        function init(){
            PostService
                .findPostById(model.postId)
                .then(renderPost);
        }

        init();

        function updatePost(postId,post) {
            if(typeof post.description === "undefined" ||
                post.description === null || post.description === '') {
                model.error = "Please enter some content for your post";
            }
            else {
                PostService
                    .updatePost(postId, post)
                    .then(function () {
                        $location.url('/artist/' + model.artistName + '/event/'+model.eventId);
                    });
            }
        }

        function deletePost(postId) {
            PostService
                .deletePost(postId)
                .then(function () {
                    $location.url('/artist/'+model.artistName+'/event/'+model.eventId);
                });

        }


        function renderPost(post) {
            model.post = post;
        }

    }
})();