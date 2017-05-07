(function () {
    'use strict';

    angular
        .module('app')
        .run(mock);

    function mock($httpBackend) {

        $httpBackend.whenGET(/^views\//).passThrough();

        var login = "123";
        var password = "123";

        var tableData = [{
            id: 1,
            firstName: "Ivan",
            lastName: "LastName",
            position: "Ceo"
        }, {
            id: 2,
            firstName: "Sasha",
            lastName: "Unknown",
            position: "Dev"
        }, {
            id: 3,
            firstName: "Mike",
            lastName: "Bark",
            position: "Dev"
        }, {
            id: 4,
            firstName: "Bob",
            lastName: "Builder",
            position: "Dev"
        }];

        $httpBackend.whenPOST('/api/login').respond(function (method, url, data, headers) {
            data = JSON.parse(data);

            if (data.login == login && data.password == password) {
                return [200, {}, {}];
            }

            return [404, {}, {}];

        });

        $httpBackend.whenGET('/api/table').respond(function (method, url, data) {
            return [200, tableData, {}];
        });

        $httpBackend.whenPOST('/api/table').respond(function (method, url, data) {
            data = JSON.parse(data);
            data.id = Math.random();
            tableData.push(data);

            return [200, data, {}];
        });

        $httpBackend.whenDELETE('/api/table').respond(function (method, url, data) {
            var ids = JSON.parse(data).ids;
            deleteDataByIds(ids);

            return [200, tableData, {}];
        });


        $httpBackend.whenPUT('/api/table').respond(function (method, url, data) {
            var data = JSON.parse(data);
            tableData[getIndexById(data.id)] = data;

            return [200, tableData, {}];
        });

        $httpBackend.when('GET', /api\/table\/filtered\/\w+$/)
            .respond(function (method, url, data) {
                var args = url.match(/\/api\/table\/filtered\/(.+)/);
                var filter = args[1];

                var filtered = tableData.filter(function (item) {
                    return (item.firstName.toLowerCase().indexOf(filter .toLowerCase()) !== -1
                    || item.lastName.toLowerCase().indexOf(filter .toLowerCase()) !== -1
                    || item.position.toLowerCase().indexOf(filter .toLowerCase()) !== -1);
                });

                return [200, filtered, {}];
            });

        function deleteDataByIds(ids) {
            for (var i = 0; i < ids.length; i++) {
                for (var j = 0; j < tableData.length; j++) {
                    if (ids[i] == tableData[j].id) tableData.splice(j, 1);
                }
            }
        }

        function getIndexById(id) {
            for (var i = 0; i < tableData.length; i++) {
                if (tableData[i].id == id) return i;
            }

            return -1;
        }
    }

})();