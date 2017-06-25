(function () {
    angular
        .module('ConcertFever')
        .controller('AdminPostsController',adminPostsController);

    function adminPostsController($location,currentUser,PostService) {

        var model = this;

        model.uid = currentUser._id;
        model.deletePost = deletePost;

        function init() {
            renderAllPosts();

        }
        init();

        function renderAllPosts() {
            PostService.findAllPost()
                .then(function (posts) {
                    model.posts = posts;
                });
        }

        function deletePost(postId) {
            PostService.deletePost(postId)
                .then( renderAllPosts);
        }


    }
})();