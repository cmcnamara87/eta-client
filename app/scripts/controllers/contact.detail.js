'use strict';

angular.module('etaApp')
    .controller('ContactDetailCtrl', function($scope, Restangular, $stateParams, Geo) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        Restangular.one('me/contacts', $stateParams.contactId).get().then(function(contact) {
            $scope.contact = contact;
        }).then(function() {
            return Geo.getLocation();
        }).then(function(position) {
            return Restangular.all('me/locations').post({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }).then(function() {
            Restangular.one('me/contacts', $stateParams.contactId).one('eta').get().then(function(eta) {
                $scope.eta = eta;
            });
        });

    });
