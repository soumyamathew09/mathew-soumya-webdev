(function () {
    angular
        .module('ConcertFever')
        .controller('SearchController',searchController);

        function searchController($location,currentUser,MusicService) {
            var model = this;

            model.searchArtistsByName = searchArtistsByName;
            model.searchBandsInTown = searchBandsInTown;
            model.searchArtist = searchArtist;
            model.eventsPresent = eventsPresent;

            function searchArtistsByName(searchText) {
                MusicService.searchArtistsByName(searchText)
                    .then(function (response) {
                        console.log(response.data.Artists)
                        model.results = response.data.Artists;
                        model.artist = '';
                    });
            }

            function searchArtist(searchText) {
                MusicService.searchArtist(searchText)
                    .then(function (response) {
                        console.log(response.data);
                        if(response.data !== undefined){
                            model.error = '';
                            model.artist =response.data;
                        }

                    }, function () {
                        model.artist = '';
                        model.error = "Unable to find information on "+ searchText ;

                    });
            }

            function searchBandsInTown(searchText) {
                MusicService.searchBandsInTown(searchText)
                    .then(function (response) {
                        console.log(response.data)
                        model.artist = response.data;
                    });
            }

            function eventsPresent(eventCount) {
                if(eventCount > 0){
                    model.events = "See upcoming concerts";
                    return true;
                }
            }
        }
    })
();
