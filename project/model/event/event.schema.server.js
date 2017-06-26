var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    attendees : [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    name: String,
    bitId:Number,
    artistBitId:Number,
    description: String,
    datetime: Date,
    venue:{
        name:String,
        city:String,
        country:String
    },
    dateCreated : {type: Date , default:Date.now}
},{collection:'project_event'});

module.exports = eventSchema;
