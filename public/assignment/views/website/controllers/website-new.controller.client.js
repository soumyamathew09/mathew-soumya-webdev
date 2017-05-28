(function(){
    angular.module('WebAppMaker')
            .controller('NewWebsiteController',websiteNewController);

    function websiteNewController($routeParams,$location,websiteService) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.createWebsite = createWebsite;

        function init(){
            model.websites =  websiteService.findWebsitesByUser(model.userId);
        }

        init();

        function createWebsite(userId,website) {
            websiteService.createWebsite(userId,website);
            $location.url('/user/'+model.userId+'/website');
        }

    }
})();