(function(){
    angular.module('WebAppMaker')
            .controller('PageListController',pageListController);

    function pageListController($routeParams,PageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['wid'];

        function init(){
            model.pages =  PageService.findPageByWebsiteId(model.websiteId);
        }
        init();
    }
})();