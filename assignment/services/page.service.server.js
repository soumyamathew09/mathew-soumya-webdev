var app = require('../../express')

app.get('/api/assignment/website/:websiteId/page',findAllPagesForWebsite);
app.post('/api/assignment/website/:websiteId/page',createPage);
app.get('/api/assignment/page/:pageId',findPageById);
app.put('/api/assignment/page/:pageId',updatePage);
app.delete('/api/assignment/page/:pageId',deletePage);

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

function findAllPagesForWebsite(req,res) {

    var results = [];
    var websiteId = req.params['websiteId'];

    for (p in pages) {
        if (pages[p].websiteId === websiteId) {
            results.push(pages[p]);
        }
    }
    res.json(results);
    return;

}

function createPage(req,res) {

    var websiteId = req.params['websiteId'];
    var page = req.body;
    page._id = (new Date().getTime()) + "";
    page.websiteId = websiteId;
    pages.push(page);
    res.sendStatus(200);
    return;

}

function findPageById(req,res) {
    var pageId = req.params['pageId'];
    for (p in pages) {
        if(pages[p]._id === pageId){
            res.json(pages[p]);
            return;
        }
    }
    res.sendStatus(404);
}

function updatePage(req,res) {
    var pageId = req.params['pageId'];
    var page = req.body;
    for (p in pages) {
        if(pages[p]._id === pageId){
            pages[p].name = page.name;
            pages[p].description = page.description;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deletePage(req,res) {
    var pageId = req.params['pageId'];

    for (p in pages) {
        if(pages[p]._id === pageId) {
            pages.splice(p, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}