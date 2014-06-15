'use strict';

angular.module('etaApp')
    .directive('etaTimer', function($interval) {
        return {
            templateUrl: 'templates/etatimer.html',
            restrict: 'E',
            scope: {
                eta: '=',
                contactId: '@'
            },
            link: function postLink(scope) {
                // var UPDATE_IN_SECONDS = 60,
                //     countdownTimer, updateTimer;
                var countdownTimer;

                scope.$on('$destroy', function() {
                    // console.log('got a scope destroy!!!');
                    $interval.cancel(countdownTimer);
                    // $interval.cancel(updateTimer);
                    // $timeout.cancel(tooLongTimer);
                });


                scope.$watch('eta.duration', function(time) {
                    scope.minutes = Math.floor(time / 60);
                    scope.seconds = ('0' + (time - scope.minutes * 60)).slice(-2);
                });
                scope.$watch('eta', function(eta) {
                    if (eta) {
                        // console.log('eta', eta);
                        if (countdownTimer) {
                            // Stop the timer
                            $interval.cancel(countdownTimer);
                        }
                        // console.log('eta is', eta);
                        if (eta.movement === 'towards' && eta.duration > 0) {
                            // Start the countdown timer
                            countdownTimer = $interval(function() {
                                // console.log('timer ran');
                                scope.eta.duration = scope.eta.duration - 1;
                            }, 1000, scope.eta.duration);
                        }
                    }
                });


                //         $scope.$on('$destroy', function() {
                //             console.log('got a scope destroy!!!');
                //             $interval.cancel(countdownTimer);
                //             $interval.cancel(updateTimer);
                //             $timeout.cancel(tooLongTimer);
                //         });

                //                 element.text('this is the etaTimer directive');
                // if (eta.movement === 'towards' && eta.time > 0) {
                //                         countdownTimer = $interval(function() {
                //                             $scope.eta.time = $scope.eta.time - 1;
                //                         }, 1000, $scope.eta.time);
                //                     }
                //                 });
                //             });
                //         }

                //         $scope.$watch('eta.time', function(time) {
                //             $scope.minutes = Math.floor(time / 60);
                //             $scope.seconds = ('0' + (time - $scope.minutes * 60)).slice(-2);
                //         });

            }
        };
    });
