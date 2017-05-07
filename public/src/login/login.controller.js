(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    function LoginCtrl(loginService, $state) {
        var vm = this;

        vm.singIn = function () {
            var loginData = {
                login: vm.login,
                password: vm.password
            };

            loginService.login(loginData, function (err, res) {
                if (!err) {
                    $state.go('table');
                } else {
                    alert("Login or password invalid");
                }
            });
        };
    }
})();