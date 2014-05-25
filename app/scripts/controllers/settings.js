'use strict';

angular.module('etaApp')
    .controller('SettingsCtrl', function($scope, Restangular, $state, ENV) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        if (ENV.name === 'phone') {
            analytics.trackView('Settings');
        }

        Restangular.one('me/profile').get().then(function(profile) {
            $scope.profile = profile;
        });

        $scope.signout = function() {
            if (ENV.name === 'phone') {
                analytics.trackEvent('User', 'Sign out');
            }

            Restangular.all('users').logout().then(function() {
                $state.go('tab.contacts');
            });
        };
    });
