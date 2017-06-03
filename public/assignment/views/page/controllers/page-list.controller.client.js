(function(){
    angular.module('WebAppMaker')
            .controller('PageListController',pageListController);

    function pageListController($routeParams,PageService) {
        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];

        function init(){
           PageService
               .findPageByWebsiteId(model.wid)
               .then(renderPages);
        }
        init();

        function renderPages(pages) {
            model.pages = pages;
        }
    }
})();