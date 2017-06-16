(function(){
    angular.module('WebAppMaker')
            .controller('WebsiteListController',websiteListController);

    function websiteListController(currentUser,WebsiteService) {

        var model = this;

        model.uid = currentUser._id;

        function init(){
            WebsiteService
                .findWebsitesByUser(model.uid)
                .then(renderWebsites);

        }
        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }
    }
})();