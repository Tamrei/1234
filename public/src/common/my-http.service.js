(function () {
    'use strict';

    angular
        .module('app')
        .factory('myHttp', myHttp);

    myHttp.$inject = ['$http', 'constants'];

    function myHttp($http, constants) {

        var service = {
            defaultRequest: defaultRequest,
            defaultGetRequest: defaultGetRequest
        };

        return service;

        function defaultRequest(url, method, data, callback) {
            return $http({
                method: method,
                url: constants.apiUrl + url,
                data: data
            }).then(function (res) {
                callback(null, res.data);
            }, function (err) {
                callback(err, null);
            });
        }

        function defaultGetRequest(url, callback) {
            defaultRequest(url, 'GET', '', callback)
        }


    }
})();
