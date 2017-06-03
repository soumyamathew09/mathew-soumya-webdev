(function(){
    angular.module('WebAppMaker')
            .controller('WebsiteListController',websiteListController);

    function websiteListController($routeParams,WebsiteService) {

        var model = this;

        model.uid = $routeParams['uid'];

        function init(){
            WebsiteService
                .findWebsitesByUser(model.uid)
                .then(renderWebsites);

        }
        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }
    }
})();