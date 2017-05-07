(function () {
    'use strict';

    angular
        .module('app')
        .factory('tableService', tableService);

    tableService.$inject = ['myHttp'];

    function tableService(myHttp) {

        var service = {
            getTableData: getTableData,
            deleteTables: deleteTables,
            addTables: addTables,
            getFilteredTable: getFilteredTable,
            updateTable: updateTable
        };

        return service;

        function deleteTables(data, callback) {
            return myHttp.defaultRequest('/table', 'DELETE', data, callback)
        }

        function addTables(data, callback) {
            return myHttp.defaultRequest('/table', 'POST', data, callback)
        }

        function updateTable(data, callback) {
            return myHttp.defaultRequest('/table', 'PUT', data, callback)
        }

        function getTableData(callback) {
            return myHttp.defaultGetRequest("/table", callback);
        }

        function getFilteredTable(filter, callback) {
            return myHttp.defaultGetRequest("/table/filtered/" + filter, callback);
        }
    }
})();