(function(){
    angular.module('WebAppMaker')
            .controller('PageListController',pageListController);

    function pageListController($routeParams,currentUser,PageService) {
        var model = this;

        model.uid = currentUser._id;
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