(function () {
    angular
        .module('ConcertFever')
        .controller('AdminPostsController',adminPostsController);

    function adminPostsController($location,currentUser,PostService) {

        var model = this;

        model.uid = currentUser._id;
        model.deletePost = deletePost;
        model.selectPost = selectPost;
        model.updatePost = updatePost;

        function init() {
            renderAllPosts();
        }
        init();

        function renderAllPosts() {
            PostService.findAllPost()
                .then(function (posts) {
                    model.post=[];
                    model.posts = posts;
                });
        }

        function deletePost(postId) {
            PostService.deletePost(postId)
                .then( renderAllPosts);
        }

        function selectPost(post) {
            model.post = angular.copy(post);
        }

        function updatePost(post) {
            PostService.updatePost(post._id,post)
                .then(renderAllPosts());
        }

    }
})();