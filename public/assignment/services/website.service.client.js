(function(){
    angular.module('WebAppMaker')
            .service('WebsiteService',websiteService);
    
    function websiteService($http) {

        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteById = findWebsiteById;
        this.deleteWebsite = deleteWebsite;
        this.createWebsite = createWebsite;
        this.updateWebsite = updateWebsite;


    function findWebsitesByUser(userId) {

            var url = '/api/assignment/user/' + userId + '/website';
            return $http.get(url)
                        .then(function (response) {
                            return response.data;
                });

        }

        function findWebsiteById(websiteId) {

            var url = '/api/assignment/website/'+ websiteId;
            return $http.get(url)
                         .then(function (response) {
                            return response.data;
                    });
        }

        function deleteWebsite(websiteId) {
            var url = '/api/assignment/website/'+ websiteId;
            return $http.delete(url)
                        .then(function (response) {
                        return response.data;
                });
        }

        function createWebsite(userId, website) {
            var url = '/api/assignment/user/'+ userId +'/website';
            return $http.post(url,website)
                        .then(function (response) {
                        return response.data;
                });
        }

        function updateWebsite(websiteId, website) {
            var url = '/api/assignment/website/'+ websiteId;
            return $http.put(url,website)
                        .then(function (response) {
                            return response.data;
                        });
        }

    }
})();