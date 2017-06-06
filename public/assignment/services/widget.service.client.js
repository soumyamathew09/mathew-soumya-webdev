(function(){

    angular.module('WebAppMaker')
        .service('WidgetService',WidgetService);

    function WidgetService($http) {
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.createWidget = createWidget;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.sortWidget = sortWidget;

        function findWidgetsByPageId(pageId) {

            var url = '/api/assignment/page/' + pageId + '/widget';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createWidget(pageId, widget) {

            var url = '/api/assignment/page/' + pageId + '/widget';
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                });

        }

        function findWidgetById(widgetId) {

            var url = '/api/assignment/widget/'+widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWidget(widgetId, widget) {

            var url = '/api/assignment/widget/'+widgetId;
            return $http.put(url,widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWidget(widgetId) {
            var url = '/api/assignment/widget/'+widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });

        }
        
        function sortWidget(pageId,initial,final) {
            var url = '/api/assignment/page/'+pageId+'/widget?initial='+ initial+'&final='+final;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();