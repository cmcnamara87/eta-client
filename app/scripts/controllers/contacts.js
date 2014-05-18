'use strict';

angular.module('etaApp')
    .controller('ContactsCtrl', function($scope, contacts) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.contacts = contacts;
        // Restangular.all('me/contacts').getList().then(function(contacts) {
        //     $scope.contacts = contacts;
        // });


    });
