(function(){
    angular.module('WebAppMaker')
            .controller('NewPageController',newPageController);

    function newPageController($routeParams,$location,PageService) {

        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.createPage = createPage;


        function createPage(uid,page) {
            PageService
                    .createPage(uid,page)
                    .then(function () {
                        $location.url('/user/'+model.uid+'/website/'+ model.wid + '/page');
                    });
        }

    }
})();