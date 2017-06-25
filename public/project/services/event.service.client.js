(function(){
    angular.module('ConcertFever')
        .service('EventService',eventService);

    function eventService($http) {

        this.findEventsByArtist = findEventsByArtist;
        this.searchBandsInTown = searchBandsInTown;
        this.searchArtist = searchArtist;
        this.searchArtistsByName = searchArtistsByName;
        this.addAttendee = addAttendee;
        this.findEventInfo = findEventInfo;
        this.findEventByBITId = findEventByBITId;
        this.createEvent = createEvent;
        this.findEventById = findEventById;
        this.removeAttendee=removeAttendee;

        var key = "e7nuetftp4wpqqtwrvsw49kz";
        //var secret = "a558bfc44b5922a5";
        //http://api.jambase.com/events?zipCode=TEXT&page=0&api_key=API_KEY

        function searchArtistsByName(searchTerm) {
            var urlBase = "http://api.jambase.com/artists?name=TEXT&page=0&api_key=API_KEY";
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }

        function searchArtist(searchTerm) {
            var urlBand = "https://rest.bandsintown.com/artists/TEXT?app_id=concertFever";
            var u = urlBand.replace("TEXT",searchTerm);
            return $http.get(u);
        }

        function searchBandsInTown(searchTerm) {
            var urlBand = "https://rest.bandsintown.com/artists/TEXT?app_id=concertFever";
            var u = urlBand.replace("TEXT",searchTerm);
            return $http.get(u);
        }

        function findEventsByArtist(artistName) {
            var url = "https://rest.bandsintown.com/artists/TEXT/events?app_id=concertFever";
            var u = url.replace("TEXT",artistName);
            return $http.get(u)
                .then(function (response) {
                    return response.data
                });
        }

        function addAttendee(userId,eventId) {
            var rsvp = {
                userId: userId,
                eventId:eventId
            }
            var url = '/api/project/attend/';
            return $http.put(url,rsvp)
                .then(function (response) {
                    return response.data;
                });
        }

        function removeAttendee(userId,eventId) {
            var rsvp = {
                userId: userId,
                eventId:eventId
            }
            var url = '/api/project/notattend/';
            return $http.put(url,rsvp)
                .then(function (response) {
                    return response.data;
                });
        }



        function findEventInfo(artistName,eventId) {
            var urlE = '/api/project/event/'+eventId;
            return $http.get(urlE)
                .then(function (event) {
                    var urlEvent = "https://rest.bandsintown.com/artists/ARTIST/events/EVENTID?app_id=concertFever";
                    var u = urlEvent.replace("EVENTID",event.data.bitId);
                    var url = u.replace("ARTIST",artistName);
                    return $http.get(url)
                        .then(function (response) {
                            return response.data
                        });
                });
        }


        function findEventByBITId(eventBitId) {
            var url = '/api/project/bitevent/'+eventBitId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createEvent(event) {
            var url = '/api/project/event';
            return $http.post(url,event)
                .then(function (response) {
                    return response.data
                });
        }

        function findEventById(eventId) {
            var url = '/api/project/event/'+ eventId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }




})();
