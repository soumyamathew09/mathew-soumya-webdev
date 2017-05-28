(function(){
    angular.module('WebAppMaker')
        .controller('EditWidgetController',EditWidgetController);

    function EditWidgetController($routeParams,$location,WidgetService) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.widgetId = $routeParams['wgid'];
        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;

        function init(){
            model.widget = WidgetService.findWidgetById(model.widgetId);
        }

        init();

        function deleteWidget(widgetId) {
            WidgetService.deleteWidget(widgetId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

        function updateWidget(widgetId, widget) {
            WidgetService.updateWidget(widgetId, widget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

    }
})();