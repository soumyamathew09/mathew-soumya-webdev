(function(){
    angular
        .module('WebAppMaker')
        .controller('WidgetListController',widgetListController);

    function widgetListController($routeParams,$sce,$location,WidgetService) {

        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];


        function init() {
            WidgetService
                .findWidgetsByPageId(model.pid)
                .then(renderWidgets);
            model.trust = trust;
            model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
            model.widgetUrl = widgetUrl;
            model.widgetCog = widgetCog;
        }

        init();

        function renderWidgets(response) {
            model.widgets = response;
        }

        function trust(html){
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(linkUrl) {
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function widgetUrl(widget) {
            if (widget.widgetType === 'HEADING' ||widget.widgetType === 'IMAGE' ||widget.widgetType === 'YOUTUBE'||
                    widget.widgetType ==='HTML') {
                var url = 'views/widget/templates/widget-' + widget.widgetType.toLowerCase() + '.view.client.html';
                return url;
            }
        }

        function widgetCog(widget) {
            if (widget.widgetType === 'HEADING' ||widget.widgetType === 'IMAGE' ||widget.widgetType === 'YOUTUBE' ){
                $location.url('/user/'+model.uid+'/website/'+ model.wid + '/page/'
                    + model.pid + "/widget/"+widget._id);
            }
        }
     }
})();