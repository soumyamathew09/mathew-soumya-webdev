(function(){
    angular.module('WebAppMaker')
            .controller('EditWebsiteController',websiteEditController);

    function websiteEditController($routeParams,$location,websiteService) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.wid = $routeParams['wid'];
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init(){
            model.websites =  websiteService.findWebsitesByUser(model.userId);
            model.website = websiteService.findWebsiteById(model.wid);
        }

        init();

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/'+model.userId+'/website');
        }
        
        function updateWebsite(websiteId,website) {
            websiteService.updateWebsite(websiteId,website);
            $location.url('/user/'+model.userId+'/website');
        }

    }
})();