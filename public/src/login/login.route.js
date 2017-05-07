(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('login', {
                url: "/login",
                controller: "LoginCtrl as login",
                templateUrl: "views/login.html"
            });
    }
})();
