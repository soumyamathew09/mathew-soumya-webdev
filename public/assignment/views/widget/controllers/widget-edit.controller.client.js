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
            model.widget = WidgetService.findWidgetById(model.wgid);
        }

        init();

        function deleteWidget(wgid) {
            WidgetService.deleteWidget(wgid);
            $location.url('/user/'+model.uid+'/website/'+model.wid+'/page/'+model.pid+'/widget');
        }

        function updateWidget(wgid, widget) {
            WidgetService.updateWidget(wgid, widget);
            $location.url('/user/'+model.uid+'/website/'+model.wid+'/page/'+model.pid+'/widget');
        }

    }
})();