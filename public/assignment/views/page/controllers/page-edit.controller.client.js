(function(){
    angular.module('WebAppMaker')
            .controller('EditPageController',editPageController);

    function editPageController($routeParams,$location,PageService) {

        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];
        model.deletePage = deletePage;
        model.updatePage = updatePage;

        function init(){
            PageService
                .findPageById(model.pid)
                .then(renderPage);
            PageService
                .findPageByWebsiteId(model.wid)
                .then(renderPages);
        }

        init();

        function deletePage(websiteId,pageId) {
            PageService
                .deletePage(websiteId,pageId)
                .then(function () {
                    $location.url('/user/'+model.uid+'/website/'+model.wid+'/page');
                });

        }
        
        function updatePage(pageId,page) {
            PageService
                .updatePage(pageId,page)
                .then(function () {
                    $location.url('/user/'+model.uid+'/website/'+model.wid+'/page');
                });
        }

        function renderPage(page) {
            model.page = page;
        }

        function renderPages(pages) {
            model.pages = pages;
        }
    }
})();