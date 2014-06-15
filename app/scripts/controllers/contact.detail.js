'use strict';

angular.module('etaApp')
    .controller('ContactDetailCtrl', function($scope, Restangular, $stateParams, Geo, $interval, $timeout, $state, ENV) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        var UPDATE_IN_SECONDS = 60,
            countdownTimer, updateTimer, tooLongTimer;

        $scope.$on('$destroy', function() {
            console.log('got a scope destroy!!!');
            $interval.cancel(countdownTimer);
            $interval.cancel(updateTimer);
            $timeout.cancel(tooLongTimer);
        });

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

                    if (eta.movement === 'towards') {
                        $scope.movement = 'Heading towards you';
                    } else if (eta.movement === 'away') {
                        $scope.movement = 'Heading away from you';
                    } else if (eta.movement === 'stationary') {
                        $scope.movement = 'Standing still';
                    }


                    // Start the timer again
                    if (eta.movement === 'towards' && eta.time > 0) {
                        countdownTimer = $interval(function() {
                            $scope.eta.time = $scope.eta.time - 1;
                        }, 1000, $scope.eta.time);
                    }
                });
            });
        }

        $scope.$watch('eta.time', function(time) {
            $scope.minutes = Math.floor(time / 60);
            $scope.seconds = ('0' + (time - $scope.minutes * 60)).slice(-2);
        });

        Restangular.one('me/contacts', $stateParams.contactId).get().then(function(contact) {
            $scope.contact = contact;

            // Send the track event
            if (ENV.name === 'phone') {
                analytics.trackEvent('ETA', 'View ETA', 'Viewed ' + contact.name, $stateParams.contactId);
            }
        }).then(function() {
            // Start the update timer
            // checks with the server for an updated eta
            $scope.updateIn = UPDATE_IN_SECONDS;
            updateTimer = $interval(function() {
                console.log('update timer running');
                $scope.updateIn--;
                if ($scope.updateIn === 0) {
                    console.log('Polling server');
                    getEta(true);
                    $scope.updateIn = UPDATE_IN_SECONDS;
                }
            }, 1000);

            return getEta(false);
        });

        // Go back to contacts screen after 10 minutes
        tooLongTimer = $timeout(function() {
            // This is just to stop the polling in case someone leaves the app in the foreground
            // and on this screen
            $state.go('tab.contacts');
        }, 600000);
    });
