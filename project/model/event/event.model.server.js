var mongoose = require('mongoose');
var eventSchema = require('./event.schema.server');
var eventModel = mongoose.model('EventModel',eventSchema);
var userModel = require('../user/user.model.server');
var userModel = require('../post/post.model.server');


eventModel.createEvent = createEvent;
eventModel.addAttendee = addAttendee;
eventModel.findEventById=findEventById;
eventModel.findEventByBitId=findEventByBitId;
eventModel.removeAttendee =removeAttendeeForEvent;
eventModel.removeAttendeeFromAllEvents = removeAttendee

module.exports = eventModel;

function addAttendee(userId,eventId) {
    return eventModel.findById(eventId)
        .then(function (event) {
            event.attendees.push(userId);
            return event.save();
        });
}

function removeAttendeeForEvent(userId,eventId) {
    return eventModel.findById(eventId)
        .then(function (event) {
            var index = event.attendees.indexOf(userId);
            event.attendees.splice(index,1);
            return event.save();
        });
}

function removeAttendee(userId) {
    return eventModel.updateMany(
        {attendees: {$in: [userId]}},
        {$pull: {attendees: userId}});
}

function createEvent(event) {
    event.bitId = event.id;
    return eventModel.create(event)
        .then(function (event) {
            return event;
        });
}

function findEventById(eventId) {
    return eventModel.findById(eventId);
}

function findEventByBitId(eventBitId) {
    return eventModel.find({bitId: eventBitId});
}

