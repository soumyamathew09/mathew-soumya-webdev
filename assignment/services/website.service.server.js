var app = require('../../express');

var websiteModel = require('../model/website/website.model.server');

app.get('/api/assignment/user/:userId/website',findAllWebsitesForUser);
app.post('/api/assignment/user/:userId/website',createWebsite);
app.get('/api/assignment/website/:websiteId',findWebsiteById);
app.put('/api/assignment/website/:websiteId',updateWebsite);
app.delete('/api/assignment/user/:userId/website/:websiteId',deleteWebsite);


function findAllWebsitesForUser(req,res) {
    var userId = req.params['userId'];
    websiteModel.findAllWebsitesForUser(userId)
        .then(function (results) {
            res.json(results);
            return;
        });
}

function createWebsite(req,res) {
    var userId = req.params['userId'];
    var website = req.body;
    return websiteModel.createWebsiteForUser(userId,website)
        .then(function () {
            res.sendStatus(200);
            return;
        });
}

function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    return websiteModel.findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website);
            return;
        });
}

function updateWebsite(req,res) {
    var websiteId = req.params['websiteId'];
    var website = req.body;
    return websiteModel.updateWebsite(websiteId,website)
        .then(function () {
            res.sendStatus(200);
            return;
        });

}

function deleteWebsite(req,res) {
    var websiteId = req.params['websiteId'];
    var userId = req.params['userId'];
    return websiteModel.deleteWebsite(userId,websiteId)
        .then(function () {
            res.sendStatus(200);
            return;
        } );

}