'use strict';

angular.module('etaApp')
    .directive('contact', function($ionicGesture, $ionicLoading, Restangular, $interval, $timeout, Geo) {
        return {
            templateUrl: 'templates/contact.html',
            restrict: 'E',
            scope: {
                contact: '='
            },
            link: function postLink(scope, element) {
                var updateTimer;

                function ping() {
                    $ionicLoading.show({
                        template: 'Pinged!'
                    });
                    $timeout(function() {
                        $ionicLoading.hide();
                    }, 500);
                    // var alertPopup = $ionicPopup.alert({
                    //     title: 'Ping!',
                    //     template: 'You pinged ' + scope.contact.name + '.'
                    // });
                    // alertPopup.then(function() {
                    //     console.log('Thank you for not eating my delicious ice cream cone');
                    // });

                    return Geo.getLocation().then(function(position) {
                        return Restangular.all('me/locations').post({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                    }).then(function() {
                        return Restangular.one('me/contacts', scope.contact.id).all('ping').post({});
                    });
                }

                // element.text('this is the contact directive');
                $ionicGesture.on('doubletap', ping, element);

                scope.$on('$destroy', function() {
                    $ionicGesture.off('doubletap', ping, element);
                    $interval.cancel(updateTimer);
                });

                scope.openPing = function(ping) {
                    // console.log('++++++++++++++++++++++++++++++++++++++!');
                    // console.log('opening ping!');
                    // window.location.href('http://maps.google.com/maps?ll=' + ping.latitude + ',' + ping.longitude);
                    // window.location.href('maps:q=' + encodeURIComponent(ping.address));
                    // navigator.app.loadUrl('http://maps.google.com/maps?ll=' + ping.latitude + ',' + ping.longitude, {
                    //     openExternal: true
                    // });
                    // 
                    // https://maps.google.com?saddr=Current+Location&daddr=43.12345,-76.12345
                    $ionicLoading.show({
                        template: 'Loading...'
                    });

                    Geo.getLocation().then(function(position) {
                        $ionicLoading.hide();
                        var url = 'https://maps.google.com?saddr=' + position.coords.latitude + ',' + position.coords.longitude + '&daddr=' + ping.latitude + ',' + ping.longitude;
                        window.open(url, '_system', 'location=no');
                    });

                    // window.open('maps:q=Bacau');
                    // $event.preventDefault();
                    // $event.stopPropagation();
                };


                scope.$watch('contact.eta.movement', function(movement) {
                    $interval.cancel(updateTimer);
                    if (movement && movement === 'towards' && scope.contact.eta.duration !== 0) {
                        console.log('Starting update timer');
                        updateTimer = $interval(function() {
                            console.log('update timer running');
                            scope.contact.one('eta').get().then(function(eta) {
                                angular.copy(eta, scope.contact.eta);
                            });
                            // $scope.updateIn--;
                            // if ($scope.updateIn === 0) {
                            // console.log('Polling server');
                            // getEta(true);
                            // $scope.updateIn = 60;
                            // }
                        }, 60000);
                    }
                });
            }
        };
    });
