(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('table', {
                url: "/table",
                controller: "TablePageCtrl as table",
                templateUrl: "views/table-page.html"
            })
    }
})();
