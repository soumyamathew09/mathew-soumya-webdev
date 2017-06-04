(function(){
    angular.module('WebAppMaker')
        .controller('EditWidgetController',editWidgetController);

    function editWidgetController($routeParams,$location,WidgetService) {

        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];
        model.wgid = $routeParams['wgid'];
        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;

        function init(){
            WidgetService.findWidgetById(model.wgid)
                .then(renderWidget);
        }

        init();

        function renderWidget(widget) {
            model.widget = widget;
        }

        function deleteWidget(wgid) {
            WidgetService.deleteWidget(wgid)
                .then(function () {
                    $location.url('/user/'+model.uid+'/website/'+model.wid+'/page/'+model.pid+'/widget');
                });
        }

        function updateWidget(wgid, widget) {
            WidgetService.updateWidget(wgid, widget)
                .then(function () {
                    $location.url('/user/'+model.uid+'/website/'+model.wid+'/page/'+model.pid+'/widget');
                });
        }

    }
})();