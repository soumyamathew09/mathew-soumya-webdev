(function(){
    angular.module('WebAppMaker')
            .controller('NewPageController',newPageController);

    function newPageController($routeParams,currentUser,$location,PageService) {

        var model = this;

        model.uid = currentUser._id;
        model.wid = $routeParams['wid'];
        model.createPage = createPage;


        function createPage(uid,page) {
            if(typeof page === "undefined" || typeof page.name === "undefined" ||
                page.name === null || page.name === '') {
                model.error = "Please enter a name for your new page";
            }
            else {
                PageService
                    .createPage(uid, page)
                    .then(function () {
                        $location.url('/website/' + model.wid + '/page');
                    });
            }
        }

    }
})();