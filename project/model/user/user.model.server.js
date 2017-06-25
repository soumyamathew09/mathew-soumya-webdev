var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');


var userModel = mongoose.model('UserModel',userSchema);

var eventModel = require('../event/event.model.server');
var postModel = require('../post/post.model.server');


userModel.createUser = createUser;
userModel.findAllUsers = findAllUsers;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.findAllFollowers = findAllFollowers;
userModel.findAllFollowing = findAllFollowing;
userModel.updateFollowers = updateFollowers;
userModel.updateFollowing = updateFollowing;
userModel.addEvent = addEvent;
userModel.findAllEventsAttending = findAllEventsAttending;
userModel.findUserByBitId = findUserByBitId;
userModel.removeEvent = removeEvent;
userModel.likePost = likePost;
userModel.unlikePost = unlikePost;

module.exports = userModel;

function createUser(user) {
    if(! 'roles' in user || typeof user.roles === 'undefined'){
        user.roles = ['USER'];
    }
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByUsername(username) {
    return userModel.findOne({username:username})
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username:username,password:password});
}

function updateUser(userId, user) {
    delete user.username;
    delete user.password;
    return userModel.update({_id: userId},{$set: user})
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
    }

function updateFollowing(userId,followerId) {
    return userModel.findById(userId)
        .then(function (user) {
            user.following.push(followerId);
            user.save();
            return user;
        })
}

function updateFollowers(userId,followerId) {
    return userModel.findById(followerId)
        .then(function (userF) {
            userF.followers.push(userId);
            return userF.save();
        })
}

function removeEvent(userId,eventId) {
    return userModel.findById(userId)
        .then(function (user) {
            var index = user.attending.indexOf(eventId);
            user.attending.splice(index,1);
            return user.save();
        });
}

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id' : facebookId});
}

function findAllFollowers(userId) {
    return userModel.findById(userId)
        .then(function (user) {
            return userModel.find({_id:{$in:user.followers}});
        });

}



function findAllFollowing(userId) {
    return userModel.findById(userId).then(
        function (user) {
           return userModel.find({_id:{$in:user.following}});
        }
    );
}

function addEvent(userId,eventId) {
    return userModel.findById(userId)
        .then(function (user) {
            user.attending.push(eventId);
            return user.save()});
}

function findAllEventsAttending(userId) {
    return userModel.findById(userId)
        .then(function (user) {
            return eventModel.find({_id:{$in:user.attending}});
        });
}

function findUserByBitId(bitId) {
    return userModel.find({bitId:bitId});
}

function likePost(userId,postId) {
    return userModel.findById(userId)
        .then(function (user) {
            user.likedPosts.push(postId);
            return user.save();
        });
}

function unlikePost(userId,postId) {
    return userModel.findById(userId)
        .then(function (user) {
            var index = user.likedPosts.indexOf(postId);
            user.likedPosts.splice(index,1);
            return user.save();
        });
}