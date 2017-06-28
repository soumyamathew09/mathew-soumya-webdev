(function(){
    angular.module('ConcertFever')
        .service('MusicService',musicService);

    function musicService($http) {

        this.searchArtistsByName = searchArtistsByName;
        this.searchBandsInTown = searchBandsInTown;
        this.searchArtist = searchArtist;

        //var key = "7qyrrc24rzh2kcmcu5bv28vs";


        function searchArtistsByName(searchTerm) {
            var urlBase = "http://api.jambase.com/artists?name=TEXT&page=0&api_key=API_KEY";
            var url = urlBase.replace("API_KEY", process.env.JAMBASE_API_KEY).replace("TEXT", searchTerm);
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
