(function(){
    angular.module('WebAppMaker')
            .controller('NewPageController',newPageController);

    function newPageController($routeParams,$location,PageService) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['wid'];
        model.createPage = createPage;


        function createPage(userId,website) {
            PageService.createPage(userId,website);
            $location.url('/user/'+model.userId+'/website/'+ model.websiteId + '/page');
        }

    }
})();