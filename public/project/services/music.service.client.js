(function(){
    angular.module('ConcertFever')
        .service('MusicService',musicService);

    function musicService($http) {

        this.searchArtistsByName = searchArtistsByName;
        this.searchBandsInTown = searchBandsInTown;
        this.searchArtist = searchArtist;

        var key = "e7nuetftp4wpqqtwrvsw49kz";
        //var secret = "a558bfc44b5922a5";
        http://api.jambase.com/events?zipCode=TEXT&page=0&api_key=API_KEY

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

    }
})();
