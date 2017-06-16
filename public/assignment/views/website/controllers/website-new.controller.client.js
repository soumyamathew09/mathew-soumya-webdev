(function(){
    angular.module('WebAppMaker')
            .controller('NewWebsiteController',newWebsiteController);

    function newWebsiteController(currentUser,$location,WebsiteService) {

        var model = this;

        model.uid = currentUser._id;
        model.createWebsite = createWebsite;

        function init(){
            WebsiteService
                .findWebsitesByUser(model.uid)
                .then(renderWebsites);
        }

        init();

        function createWebsite(uid,website) {
            if(typeof website === "undefined" || typeof website.name === "undefined" ||
                website.name === null || website.name === '') {
                model.error = "Please enter a name for your new website";
            }
            else{
                WebsiteService
                    .createWebsite(uid, website)
                    .then(function () {
                        $location.url('/website');
                    });
                init();
            }
        }

        function renderWebsites(websites) {
            model.websites = websites;
        }
    }
})();