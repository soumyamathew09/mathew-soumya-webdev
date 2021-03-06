(function(){
    angular.module('ConcertFever')
        .controller('EventListController',eventListController);

    function eventListController($routeParams,$location,UserService,EventService) {

        var model = this;

        model.artistName = $routeParams['artistId'];
        model.fetchEvent = fetchEvent;
        model.logout = logout;

        function init(){
            UserService.loggedin()
                .then(function (user) {
                    if(user==='0'){
                        model.info = "Sign up with ConcertFever to  have access to all event information";
                        model.isAnonymous = true;
                    }
                    else {
                        model.currentUser = user;
                    }
                });
            EventService
                .findEventsByArtist(model.artistName)
                .then(renderEvents);

        }
        init();

        function renderEvents(events) {
            if(events.length > 0){
                model.events = events;
            }
            else{
                model.message = model.artistName + " doesn't have any upcoming concerts!";
            }
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

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }
})();