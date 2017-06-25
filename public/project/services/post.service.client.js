(function(){
    angular.module('ConcertFever')
        .service('PostService',postService);

    function postService($http) {
        this.findAllPostByArtistForEvent = findAllPostByArtistForEvent;
        this.findAllPostByArtist = findAllPostByArtist;
        this.findAllPostForEvent = findAllPostForEvent;
        this.findAllPost = findAllPost;
        this.createPost = createPost;
        this.updatePost = updatePost;
        this.findPostById = findPostById;
        this.deletePost = deletePost;
        this.likePost=likePost;
        this.unlikePost = unlikePost;

        function findAllPostByArtistForEvent(userId,eventId) {
            var url = '/api/project/user/' + userId + '/event/' +eventId+'/post';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllPost() {
            var url = '/api/project/admin/post';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllPostByArtist(userId) {
            var url = '/api/project/user/' + userId +'/post';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllPostForEvent(eventId) {
            var url = '/api/project/event/' + eventId +'/post';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createPost(artistId,eventId, post) {
            var url = '/api/project/artist/'+ artistId +'/event/' + eventId + '/post';
            return $http.post(url,post)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPostById(postId) {
            var url = '/api/project/post/'+postId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function updatePost(postId, post) {
            var url = '/api/project/post/'+postId;
            return $http.put(url,post)
                .then(function (response) {
                    return response.data;
                });

        }

        function deletePost(postId) {
            var url = '/api/project/post/'+postId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function likePost(postId,userId) {
            var url = '/api/project/likepost/'+postId;
            var user = {
                userId : userId
            }
            return $http.put(url,user)
                .then(function (response) {
                    return response.data;
                });
        }

        function unlikePost(postId,userId) {
            var url = '/api/project/unlikepost/'+postId;
            var user = {
                userId : userId
            }
            return $http.put(url,user)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();