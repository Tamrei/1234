(function () {
    'use strict';

    angular
        .module('app')
        .controller('TablePageCtrl', TablePageCtrl);

    function TablePageCtrl(tableService, $scope) {
        var vm = this;

        vm.sortType = 'firstName';
        vm.sortReverse = false;

        vm.getAllTableData = function () {
            tableService.getTableData(function (err, res) {
                if(!err) vm.tableData = JSON.parse(JSON.stringify(res));
            });
        };

        vm.delete = function () {
            var checked = vm.tableData.filter(function (item) {
                return item.isChecked;
            });

            var ids = checked.map(function (item) {
                return item.id;
            });

            tableService.deleteTables({ids: ids}, function (err, res) {
                if(!err) vm.tableData = res;
            });
        };

        vm.add = function () {
            tableService.addTables(vm.newTable, function (err, res) {
                if(!err) {
                    vm.newTable = {};
                    vm.tableData.push(res);
                }
            })
        };

        vm.update = function (data) {
            tableService.updateTable(data, function (err, res) {
                if(!err) vm.tableData = res;
            })
        };

        var filterWatcher = $scope.$watch(function () {
            return vm.filterVal;
        }, function (value, oldVal) {
            if (value !== oldVal) {
                if (!value) {
                    vm.getAllTableData();
                } else {
                    tableService.getFilteredTable(value, function (err, data) {
                        if (!err) vm.tableData = data;
                    });
                }
            }
        });

        vm.getAllTableData();

        $scope.$on("$destroy", function handler() {
            filterWatcher();
        });
    }
})();