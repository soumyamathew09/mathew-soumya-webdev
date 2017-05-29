(function(){
    angular.module('WebAppMaker')
            .controller('PageListController',pageListController);

    function pageListController($routeParams,PageService) {
        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];

        function init(){
            model.pages =  PageService.findPageByWebsiteId(model.wid);
        }
        init();
    }
})();