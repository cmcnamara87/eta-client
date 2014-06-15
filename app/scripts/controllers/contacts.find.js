'use strict';

angular.module('etaApp')
    .controller('ContactsFindCtrl', function($scope, Restangular) {
        $scope.contacts = {};

        Restangular.one('me').all('contacts').getList({
            type: 'requested'
        }).then(function(requested) {
            $scope.contacts.requested = requested;
        });
    });
