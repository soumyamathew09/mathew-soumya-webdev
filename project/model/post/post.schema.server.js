var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    _user : {type:mongoose.Schema.Types.ObjectId, ref:'UserModel'},
    _event: {type:mongoose.Schema.Types.ObjectId, ref:'EventModel'},
    title: String,
    description: String,
    likes:[{type:mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
    dateCreated:{type:Date, default: Date.now}},
    {collection: "project_post"});

module.exports = postSchema;