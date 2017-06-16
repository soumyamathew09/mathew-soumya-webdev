(function(){
    angular.module('WebAppMaker')
            .controller('EditPageController',editPageController);

    function editPageController($routeParams,currentUser,$location,PageService) {

        var model = this;

        model.uid = currentUser._id;
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
                    $location.url('/website/'+model.wid+'/page');
                });

        }
        
        function updatePage(pageId,page) {
            if(typeof page === "undefined" || typeof page.name === "undefined" ||
                page.name === null || page.name === '') {
                model.error = "Please enter a name for your page";
            }
            else {
                PageService
                    .updatePage(pageId, page)
                    .then(function () {
                        $location.url('/website/' + model.wid + '/page');
                    });
            }
        }

        function renderPage(page) {
            model.page = page;
        }

        function renderPages(pages) {
            model.pages = pages;
        }
    }
})();