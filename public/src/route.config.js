(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    function config($urlRouterProvider) {

        $urlRouterProvider.otherwise(function ($injector, $location) {
            var $state = $injector.get("$state");
            $state.go('login');
        });
    }
})();
