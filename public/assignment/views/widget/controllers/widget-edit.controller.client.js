(function(){
    angular.module('WebAppMaker')
        .controller('EditWidgetController',editWidgetController);

    function editWidgetController($routeParams,currentUser,$location,WidgetService) {

        var model = this;

        model.uid = currentUser._id;
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

        function deleteWidget(pid,wgid) {
            WidgetService.deleteWidget(pid,wgid)
                .then(function () {
                    $location.url('/website/'+model.wid+'/page/'+model.pid+'/widget');
                });
        }

        function updateWidget(wgid, widget) {
            if(typeof widget === "undefined" || typeof widget.name === "undefined" ||
                widget.name === null || widget.name === '') {
                model.error = "Please enter a name for your widget";
            }
            else {
                WidgetService.updateWidget(wgid, widget)
                    .then(function () {
                        $location.url('/website/' + model.wid + '/page/' + model.pid + '/widget');
                    });
            }
        }

    }
})();