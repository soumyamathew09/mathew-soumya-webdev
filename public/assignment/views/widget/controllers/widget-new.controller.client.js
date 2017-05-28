(function(){
    angular
        .module('WebAppMaker')
        .controller('NewWidgetController',NewWidgetController);

    function NewWidgetController($routeParams,$sce,WidgetService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];

        model.createWidget = createWidget;


        function createWidget(pageId,widget) {
            WidgetService.createWidget(pageId,widget);
            $location.url('/user/'+model.userId+'/website/'+ model.websiteId + '/page/'
                + model.pageId + "/widget");
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
            var url = 'views/widget/templates/widget-'+widget.widgetType.toLowerCase()+'.view.client.html';
            return url;
        }

        function widgetEditUrl(widget) {
            var url = 'views/widget/templates/widget-'+widget.widgetType.toLowerCase()+'-edit.view.client.html';
            return url;
        }
    }
})();