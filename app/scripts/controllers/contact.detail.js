'use strict';

angular.module('etaApp')
    .controller('ContactDetailCtrl', function($scope, Restangular, $stateParams, Geo, $interval, $timeout, $state) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        var UPDATE_POLL_TIME = 60000,
            countdownTimer, updateTimer;

        function getEta(isUpdate) {
            return Geo.getLocation().then(function(position) {
                return Restangular.all('me/locations').post({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }).then(function() {
                var params = {};
                if (isUpdate) {
                    params['update'] = true;
                }
                return Restangular.one('me/contacts', $stateParams.contactId).one('eta').get(params).then(function(eta) {
                    // Got an ETA

                    // Cancel the current count down timer
                    $interval.cancel(countdownTimer);

                    // Update the eta
                    $scope.eta = eta;

                    // Start the timer again
                    countdownTimer = $interval(function() {
                        $scope.eta.time = $scope.eta.time - 1;
                    }, 1000, $scope.eta.time);
                });
            });
        }

        $scope.$watch('eta.time', function(time) {
            $scope.minutes = Math.floor(time / 60);
            $scope.seconds = ('0' + (time - $scope.minutes * 60)).slice(-2);
        });

        Restangular.one('me/contacts', $stateParams.contactId).get().then(function(contact) {
            $scope.contact = contact;
        }).then(function() {
            // Start the update timer
            // checks with the server for an updated eta
            updateTimer = $interval(function() {
                console.log('Polling server');
                getEta(true);
            }, UPDATE_POLL_TIME);

            return getEta(false);
        });

        // Go back to contacts screen after 10 minutes
        $timeout(function() {
            // This is just to stop the polling in case someone leaves the app in the foreground
            // and on this screen
            $state.go('tab.contacts');
        }, 600000);
    });
