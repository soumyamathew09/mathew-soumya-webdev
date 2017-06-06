(function () {
    angular
        .module("WebAppMaker")
        .directive('wbdvSortable',wbdvSortable);

    function wbdvSortable () {

        function linkFunction(scope, element) {

            $(element).sortable({
                update: function(event, ui) {
                    scope.final =  ui.item.index();
                    scope.sortWidget({initial:scope.initial, final: scope.final});
                },
                start: function(event, ui) {
                    scope.initial =  ui.item.index();
                }
            });
        }

        return {
            scope: {sortWidget : '&sortWidget'},
            link: linkFunction
        }
    }
})();
