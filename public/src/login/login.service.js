(function () {
    'use strict';

    angular
        .module('app')
        .factory('loginService', loginService);

    loginService.$inject = ['myHttp'];

    function loginService(myHttp) {

        var service = {
            login: login
        };

        return service;

        function login(data, callback) {
            return myHttp.defaultRequest('/login', 'POST', data, callback)
        }
    }
})();