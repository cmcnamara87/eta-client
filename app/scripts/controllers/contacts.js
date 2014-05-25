'use strict';

angular.module('etaApp')
    .controller('ContactsCtrl', function($scope, Restangular, Geo, ENV, $ionicPlatform) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        Restangular.all('me/contacts').getList().then(function(contacts) {
            $scope.contacts = contacts;
        }).then(function() {
            Geo.getLocation().then(function(position) {
                return Restangular.all('me/locations').post({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }).then(function() {
                return Restangular.all('me/contacts').getList().then(function(contacts) {
                    $scope.contacts = contacts;
                });
            });
        });

        $ionicPlatform.ready(function() {
            if (ENV.name === 'phone') {
                analytics.trackView('Contacts page');
            }
        });



    });
