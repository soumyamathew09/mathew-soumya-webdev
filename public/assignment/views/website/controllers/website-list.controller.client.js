(function(){
    angular.module('WebAppMaker')
            .controller('WebsiteListController',websiteListController);

    function websiteListController($routeParams,WebsiteService) {

        var model = this;

        model.uid = $routeParams['uid'];

        function init(){
            model.websites =  WebsiteService.findWebsitesByUser(model.uid);
        }
        init();
    }
})();