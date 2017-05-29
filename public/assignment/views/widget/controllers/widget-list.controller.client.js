(function(){
    angular
        .module('WebAppMaker')
        .controller('WidgetListController',widgetListController);

    function widgetListController($routeParams,$sce,WidgetService) {

        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];


        function init() {
            model.widgets = WidgetService.findWidgetsByPageId(model.pid);
            model.trust = trust;
            model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
            model.widgetUrl = widgetUrl;
        }
        init();

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
            var url = 'views/widget/templates/widget-'+widget.widgetType.toLowerCase()+'.view.client.html';
            return url;
        }

     }
})();