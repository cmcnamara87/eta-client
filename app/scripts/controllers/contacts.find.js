'use strict';

angular.module('etaApp')
    .controller('ContactsFindCtrl', function($scope, Restangular) {
        $scope.contacts = {};

        Restangular.one('me').all('contacts').getList({
            type: 'requested'
        }).then(function(requested) {
            $scope.contacts.requested = requested;
        });

        $scope.accept = function(contact) {
            contact.accept();
            $scope.removeRequest(contact);
        };
        $scope.reject = function(contact) {
            contact.reject();
            $scope.removeRequest(contact);
        };
        $scope.removeRequest = function(contact) {
            var index = $scope.contacts.requested.indexOf(contact);
            $scope.contacts.requested.splice(index, 1);
        };
    });
