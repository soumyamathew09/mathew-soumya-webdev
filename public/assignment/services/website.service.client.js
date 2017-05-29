(function(){
    angular.module('WebAppMaker')
            .service('WebsiteService',websiteService);
    
    function websiteService() {
        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteById = findWebsiteById;
        this.deleteWebsite = deleteWebsite;
        this.createWebsite = createWebsite;
        this.updateWebsite = updateWebsite;
    }

    var websites =
        [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];
    
    function findWebsitesByUser(userId) {
        var results = [];

        for(w in websites){
            if(websites[w].developerId === userId) {
                websites[w].created = new Date();
                websites[w].accessed = new Date();
                results.push(websites[w]);
            }
        }
        return results;
    }

    function findWebsiteById(websiteId) {
        return websites.find(function (website) {
            return website._id === websiteId;
        });
    }

    function deleteWebsite(websiteId) {
        var website = findWebsiteById(websiteId);
        var index = websites.indexOf(website);
        websites.splice(index,1);
    }

    function createWebsite(userId,website) {
        website._id = (new Date().getTime()) + "";
        website.developerId = userId;
        websites.push(website);
    }
    
    function updateWebsite(websiteId,website) {
        var w = findWebsiteById(websiteId);
        var index = websites.indexOf(w)

        websites.splice(index,1);
        w.name = website.name;
        w.description = website.description
        websites.push(w);
    }

})();