(function(){
    angular.module('WebAppMaker')
            .controller('EditWebsiteController',editWebsiteController);

    function editWebsiteController($routeParams,$location,WebsiteService) {

        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init(){
            WebsiteService
                .findWebsitesByUser(model.uid)
                .then(renderWebsites);
            WebsiteService
                .findWebsiteById(model.wid)
                .then(renderWebsite);
        }

        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function renderWebsite(website) {
            model.website = angular.copy(website);
        }

        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(websiteId)
                .then(
                    function () {
                    $location.url('/user/'+model.uid+'/website');
                },
                    function () {
                    model.error = "Unable to delete website";
                });

        }
        
        function updateWebsite(websiteId,website) {
            WebsiteService
                .updateWebsite(websiteId,website)
                .then(function () {
                    $location.url('/user/'+model.uid+'/website');
                },
                function(){
                    model.error = "Website was not updated successfully"
                });
        }

    }
})();