var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
        username: {type: String, unique:true },
        password: String,
        firstName: String,
        lastName: String,
        roles: [{type: String,
        default:'USER',
        enum:['USER','FAN','ARTIST','ADMIN']}],

        facebook: {
            id:  String,
            token: String
        },

        email: String,
        phone: String,
        location: Number,
        dateCreated:{type:Date, default: Date.now},
        following:[{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
        followers:[{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
        attending:[{type: mongoose.Schema.Types.ObjectId, ref: "EventModel"}],
        likedPosts:[{type: mongoose.Schema.Types.ObjectId, ref: "PostModel"}],
        bitName: String,
        bitId: Number},
        {collection: "project_user"});

module.exports = userSchema;