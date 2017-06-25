(function(){
    angular.module('ConcertFever')
        .controller('EventListController',eventListController);

    function eventListController($routeParams,currentUser,$location,EventService) {

        var model = this;

        model.uid = currentUser._id;
        model.artistName = $routeParams['artistId'];
        model.attendingEvent = attendingEvent;
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
        
        function attendingEvent(event) {
            EventService.addAttendee(model.uid,event)

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