(function(){
    angular.module('WebAppMaker')
            .controller('EditWebsiteController',editWebsiteController);

    function editWebsiteController($routeParams,$location,WebsiteService) {

        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;
        model.copyName = copyName;

        function init(){
            model.websites =  WebsiteService.findWebsitesByUser(model.uid);
            model.website = angular.copy(WebsiteService.findWebsiteById(model.wid));
        }

        init();

        function deleteWebsite(websiteId) {
            WebsiteService.deleteWebsite(websiteId);
            $location.url('/user/'+model.uid+'/website');
        }
        
        function updateWebsite(websiteId,website) {
            WebsiteService.updateWebsite(websiteId,website);
            $location.url('/user/'+model.uid+'/website');
        }

        function copyName(website) {

        }
    }
})();