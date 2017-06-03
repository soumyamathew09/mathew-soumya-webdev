(function(){
    angular.module('WebAppMaker')
            .controller('NewWebsiteController',newWebsiteController);

    function newWebsiteController($routeParams,$location,WebsiteService) {

        var model = this;

        model.uid = $routeParams['uid'];
        model.createWebsite = createWebsite;

        function init(){
            WebsiteService
                .findWebsitesByUser(model.uid)
                .then(renderWebsites);

        }

        init();

        function createWebsite(uid,website) {
            WebsiteService
                .createWebsite(uid,website)
                .then(function () {
                    $location.url('/user/'+model.uid+'/website');
                })
        }

        function renderWebsites(websites) {
            model.websites = websites;
        }
    }
})();