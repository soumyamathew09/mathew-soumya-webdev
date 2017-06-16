(function(){
    angular
        .module('WebAppMaker')
        .controller('NewWidgetController',newWidgetController);

    function newWidgetController($routeParams,currentUser,$location,WidgetService) {
        var model = this;

        model.uid = currentUser._id;
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];

        model.createWidget = createWidget;

        function createWidget(pid,widgetType) {
            var widget = {};
            widget.widgetType = widgetType;
            WidgetService
                .createWidget(pid,widget)
                .then(function (widgetId) {
                    var wgid = widgetId;
                    $location.url('/website/'+ model.wid + '/page/'
                        + model.pid + "/widget/"+wgid);
                });
        }
    }
})();