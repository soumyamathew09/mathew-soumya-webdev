var app = require('../../express');

var eventModel = require('../model/event/event.model.server');
var userModel = require('../model/user/user.model.server');

app.put('/api/project/attend',addAttendee);
app.put('/api/project/notattend',removeAttendee);
app.post('/api/project/event',createEvent);
app.get('/api/project/event/:eventId',findEventById);
app.get('/api/project/bitevent/:eventBitId',findEventByBitId);



function createEvent(req,res) {
    var event = req.body;
    eventModel.createEvent(event)
        .then(function (event) {
            res.send(event);
            return;
        });
}

function addAttendee(req,res) {
    var rsvp = req.body;
    var userId = rsvp.userId;
    var eventId = rsvp.eventId;
    return eventModel.addAttendee(userId, eventId)
        .then(function () {
            userModel.addEvent(userId,eventId)
                .then(function () {
                    res.sendStatus(200);
                    return;
                });
        });
}

function removeAttendee(req,res) {
    var rsvp = req.body;
    var userId = rsvp.userId;
    var eventId = rsvp.eventId;
    return eventModel.removeAttendee(userId,eventId)
        .then(function () {
           userModel.removeEvent(userId,eventId)
               .then(function () {
                   res.sendStatus(200);
                   return;
               });
        });
        }
function findEventById(req,res) {
    var eventId = req.params["eventId"]
    return eventModel.findEventById(eventId)
        .then(function (event) {
            res.send(event);
            return;
        } );
}

function findEventByBitId(req,res) {
    var eventBitId = req.params["eventBitId"]
    return eventModel.findEventByBitId(eventBitId)
        .then(function (event) {
            res.send(event);
            return;
        } );
}





