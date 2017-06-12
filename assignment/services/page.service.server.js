var app = require('../../express')
var pageModel = require('../model/page/page.model.server');

app.get('/api/assignment/website/:websiteId/page',findAllPagesForWebsite);
app.post('/api/assignment/website/:websiteId/page',createPage);
app.get('/api/assignment/page/:pageId',findPageById);
app.put('/api/assignment/page/:pageId',updatePage);
app.delete('/api/assignment/website/:websiteId/page/:pageId',deletePage);

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

function findAllPagesForWebsite(req,res) {

    var websiteId = req.params['websiteId'];
    return pageModel.findAllPagesForWebsite(websiteId)
        .then(function (results) {
            res.json(results);
            return;
        });

}

function createPage(req,res) {

    var websiteId = req.params['websiteId'];
    var page = req.body;
    return pageModel.createPage(websiteId,page)
        .then(function () {
            res.sendStatus(200);
            return;
        });

}

function findPageById(req,res) {
    var pageId = req.params['pageId'];
    return pageModel.findPageById(pageId)
        .then(function (page) {
            res.json(page);
            return;
        });
}

function updatePage(req,res) {
    var pageId = req.params['pageId'];
    var page = req.body;
    return pageModel.updatePage(pageId,page)
        .then(function () {
            res.sendStatus(200);
            return;
        });
}

function deletePage(req,res) {
    var pageId = req.params['pageId'];
    var websiteId = req.params['websiteId'];

    return pageModel.deletePage(websiteId,pageId)
        .then(function () {
            res.sendStatus(200);
            return;
        });
}