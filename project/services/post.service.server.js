var app = require('../../express')
var postModel = require('../model/post/post.model.server');
var userModel = require('../model/user/user.model.server');

app.get('/api/project/user/:userId/event/:eventId/post',findAllPostByArtistForEvent);
app.get('/api/project/user/:userId/post',findAllPostByArtist);
app.get('/api/project/event/:eventId/post',findAllPostForEvent);
app.get('/api/project/admin/post', isAdmin,findAllPost);
app.post('/api/project/artist/:artistId/event/:eventId/post',createPost);
app.put('/api/project/post/:postId',updatePost);
app.get('/api/project/post/:postId',findPostById);
app.delete('/api/project/post/:postId',deletePost);
app.put('/api/project/likepost/:postId',likePost);
app.put('/api/project/unlikepost/:postId',unlikePost);


function findAllPostByArtistForEvent(req,res) {

    var userId = req.params['userId'];
    var eventId = req.params['eventId'];
    return postModel.findAllPostByArtistForEvent(userId,eventId)
        .then(function (results) {
            res.json(results);
            return;
        });

}
function isAdmin(req,res,next) {
    if((req.isAuthenticated()&& req.user.roles.indexOf("ADMIN")>-1)){
        next();
    }
    else {
        res.sendStatus(401);
    }
}

function findAllPost(req,res) {
    return postModel.findAllPost()
        .then(function (results) {
            res.json(results);
            return;
        })
}

function createPost(req,res) {

    var artistId = req.params['artistId'];
    var eventId = req.params['eventId'];
    var post = req.body;
    return postModel.createPost(artistId,eventId,post)
        .then(function () {
            res.sendStatus(200);
            return;
        });

}

function findAllPostByArtist(req,res) {
    var userId = req.params['userId'];
    return postModel.findAllPostByArtist(userId)
        .then(function (posts) {
            res.send(posts);
            return;
        });
}

function findAllPostForEvent(req,res) {
    var eventId = req.params['eventId'];
    return postModel.findAllPostForEvent(eventId)
        .then(function (posts) {
            res.send(posts);
            return;
        });
}


function findPostById(req,res) {
    var postId = req.params['postId'];
    return postModel.findPostById(postId)
        .then(function (page) {
            res.json(page);
            return;
        });
}

function updatePost(req,res) {
    var postId = req.params['postId'];
    var post = req.body;
    return postModel.updatePost(postId,post)
        .then(function () {
            res.sendStatus(200);
            return;
        });
}

function deletePost(req,res) {
    var postId = req.params['postId'];

    return postModel.deletePost(postId)
        .then(function () {
            res.sendStatus(200);
            return;
        });
}

function likePost(req,res) {
    var postId = req.params['postId'];
    var user = req.body;
    var userId = user.userId;
    return postModel.likePost(postId,userId)
        .then(function () {
           return userModel.likePost(userId,postId)
                .then(function () {
                    res.sendStatus(200);
                    return;
                })

        });
}

function unlikePost(req,res) {
    var postId = req.params['postId'];
    var user = req.body;
    var userId = user.userId;
    return postModel.unlikePost(postId,userId)
        .then(function () {
            return userModel.unlikePost(userId,postId)
                .then(function () {
                    res.sendStatus(200);
                    return;
                })

        });
}
