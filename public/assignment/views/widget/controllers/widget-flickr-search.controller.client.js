(function() {
    angular.module('WebAppMaker')
        .controller('FlickrImageSearchController', flickrImageSearchController);

    function flickrImageSearchController($routeParams,currentUser,$location,FlickrService,WidgetService) {

        var model = this;
        model.uid = currentUser._id;
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];
        model.wgid = $routeParams['wgid'];

        this.searchPhotos = searchPhotos;
        this.selectPhoto = selectPhoto;

        function init(){
            WidgetService.findWidgetById(model.wgid)
                .then(setWidget);
        }

        init();

        function setWidget(widget) {
            model.widget = widget;
        }

        function searchPhotos(searchText) {
                FlickrService
                    .searchPhotos(searchText)
                    .then(function(response) {
                        console.log(response.data);
                        data = response.data.replace("jsonFlickrApi(","");
                        data = data.substring(0,data.length - 1);
                        data = JSON.parse(data);
                        model.photos = data.photos;
                    });
            }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var w = model.widget;
            w.url = url;
            WidgetService
                .updateWidget(model.wgid,w)
                .then(function () {
                    $location.url('/website/'+model.wid+'/page/'+model.pid+'/widget/'+model.wgid);
                });
        }


    }


})();
