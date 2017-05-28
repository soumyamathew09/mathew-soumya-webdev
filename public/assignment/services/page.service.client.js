(function(){
    angular.module('WebAppMaker')
        .service('PageService',pageService);

    function pageService() {
        this.findPageByWebsiteId = findPageByWebsiteId;
        this.createPage = createPage;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;
    }
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];
    
    function findPageByWebsiteId(websiteId) {
        var results = [];

        for(p in pages){
            if(pages[p].websiteId === websiteId) {
              results.push(pages[p]);
            }
        }
        return results;
    }

    function createPage(websiteId, page) {
        page._id = (new Date().getTime()) + "";
        page.websiteId = websiteId;
        pages.push(page);
    }
    
    function findPageById(pageId) {
        return pages.find(function (page) {
            return page._id === pageId;
        });
    }
    
    function updatePage(pageId, page) {
        var p = findPageById(pageId);
        var index = pages.indexOf(p);

        pages.splice(index,1);
        p.name = page.name;
        p.description = page.description;
        pages.push(p);
    }
    
    function deletePage(pageId) {
        var page = findPageById(pageId);
        var index = pages.indexOf(page);
        pages.splice(index,1);
    }

})();