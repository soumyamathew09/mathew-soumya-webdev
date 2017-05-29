(function(){
    angular
        .module('WebAppMaker')
        .controller('NewWidgetController',newWidgetController);

    function newWidgetController($routeParams,$location,WidgetService) {
        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];

        model.createWidget = createWidget;

        function createWidget(pid,widgetType) {
            var widget = {};
            widget.widgetType = widgetType
            var wgid = WidgetService.createWidget(pid,widget);
            $location.url('/user/'+model.uid+'/website/'+ model.wid + '/page/'
                + model.pid + "/widget/"+wgid);
        }

    }
})();