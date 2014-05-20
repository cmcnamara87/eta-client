'use strict';

angular.module('etaApp')
    .controller('SettingsCtrl', function($scope, Restangular, $state) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        Restangular.one('me/profile').get().then(function(profile) {
            $scope.profile = profile;
        });

        $scope.signout = function() {
            Restangular.all('users').logout().then(function() {
                $state.go('tab.contacts');
            });
        };
    });
