var mongoose = require('mongoose');
var postSchema = require('./post.schema.server');

var postModel = mongoose.model('PostModel',postSchema);

//var websiteModel = require('../website/website.model.server');

postModel.createPost = createPost;
postModel.findAllPostByArtistForEvent = findAllPostByArtistForEvent;
postModel.findAllPostByArtist=findAllPostByArtist;
postModel.findAllPostForEvent = findAllPostForEvent;
postModel.updatePost = updatePost;
postModel.findPostById = findPostById;
postModel.deletePost = deletePost;
postModel.likePost = likePost;
postModel.unlikePost = unlikePost;
postModel.findAllPost = findAllPost;
postModel.removeLike = removeLike;
/*
pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget;
*/

module.exports = postModel;

function createPost(artistId,eventId, post) {
    post._event = eventId;
    post._user = artistId;
    return postModel.create(post);
}

function findAllPost() {
    return postModel.find();
}

function removeLike(userId) {
    return postModel.updateMany(
        {likes: {$in:[userId]}},
        {$pull:{likes: userId}}
    );
}


function findAllPostByArtistForEvent(userId,eventId) {
    return postModel.find({_user:userId , _event:eventId});
}

function findAllPostByArtist(userId) {
    return postModel.find({_user:userId}).sort({dateCreated: -1});
}

function findAllPostForEvent(eventId) {
    return postModel.find({_event:eventId}).sort({dateCreated: -1});
}



function findPostById(pageId) {
    return postModel.findById(pageId);
}


function updatePost(postId, post) {
    return postModel.update({_id:postId},{$set:post});
}


function deletePost(postId) {
    return postModel.remove({_id: postId});
}

function likePost(postId,userId) {
    return postModel.findById(postId)
        .then(function (post) {
            post.likes.push(userId)
            return post.save()
        })
}

function unlikePost(postId,userId) {
    return postModel.findById(postId)
        .then(function (post) {
            var index = post.likes.indexOf(userId);
            post.likes.splice(index,1);
            return post.save()
        })
}



