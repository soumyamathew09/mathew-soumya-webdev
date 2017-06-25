(function(){
    angular.module('ConcertFever')
        .controller('MyEventsController',myEventsController);

    function myEventsController($routeParams,currentUser,$location,EventService) {

        var model = this;

        model.uid = currentUser._id;
        model.artistName = currentUser.bitName;
        model.addEvent = addEvent;
        model.fetchEvent = fetchEvent;

        function init(){
            EventService
                .findEventsByArtist(model.artistName)
                .then(renderEvents);

        }
        init();

        function renderEvents(events) {
            model.events = events;
        }

        function fetchEvent(event) {
           return EventService.findEventByBITId(event.id)
                .then(function (response) {
                    if(response.length === 0 ) {
                        addEvent(event)
                    }
                    else{
                        $location.url('/artist/'+ model.artistName + '/event/'+response[0]._id);
                    }
                });
            }

        function addEvent(event) {
            EventService.createEvent(event)
                .then(
                    function (event) {
                        $location.url('/artist/'+ model.artistName + '/event/'+event._id);
                    }
                )
        }

        }
})();