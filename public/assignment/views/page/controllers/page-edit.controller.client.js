(function(){
    angular.module('WebAppMaker')
            .controller('EditPageController',editPageController);

    function editPageController($routeParams,$location,PageService) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];
        model.deletePage = deletePage;
        model.updatePage = updatePage;

        function init(){
            model.page = PageService.findPageById(model.pid);
        }

        init();

        function deletePage(pageId) {
            PageService.deletePage(pageId);
            $location.url('/user/'+model.userId+'/website/'+model.wid+'/page');
        }
        
        function updatePage(pageId,page) {
            PageService.updatePage(pageId,page);
            $location.url('/user/'+model.userId+'/website/'+model.wid+'/page');
        }

    }
})();