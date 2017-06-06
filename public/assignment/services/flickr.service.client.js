(function(){
    angular.module('WebAppMaker')
        .service('FlickrService',flickrService);

    function flickrService($http) {

        this.searchPhotos = searchPhotos;

        var key = "1492c50d08af772276f84573a0f17c13";
        var secret = "a558bfc44b5922a5  ";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
            }

    }
})();
