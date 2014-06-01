'use strict';

angular.module('etaApp')
    .controller('ContactsCtrl', function($scope, Contacts, Restangular, Geo, ENV, $ionicPlatform, $q, $state) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.signout = function() {
            if (ENV.name === 'phone') {
                analytics.trackEvent('User', 'Sign out');
            }

            Restangular.all('users').logout().then(function() {
                Contacts.contacts = [];
                $state.go('tab.contacts');
            });
        };


        $scope.contacts = (Contacts.contacts = Contacts.contacts || []);

        Restangular.all('me/contacts').getList().then(function(contacts) {
            // Contacts.contacts = contacts;
            angular.forEach(contacts, function(contact) {
                var found = false;
                angular.forEach(Contacts.contacts, function(existingContact) {
                    if (existingContact.id === contact.id) {
                        found = true;
                    }
                });
                if (!found) {
                    $scope.contacts.push(contact);
                }
            });
        }).then(function() {
            return Geo.getLocation();
        }).then(function(position) {
            return Restangular.all('me/locations').post({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }).then(function() {
            return getEtas();
        });

        $ionicPlatform.ready(function() {
            if (ENV.name === 'phone') {
                analytics.trackView('Contacts page');
            }
        });

        $scope.orderEta = function(contact) {
            if (contact.eta && contact.eta.status === 'online') {
                return contact.eta.duration + 1;
            } else {
                return 9999;
            }
        };

        $scope.refresh = function() {
            var requests = [];

            var etas = Geo.getLocation().then(function(position) {
                return Restangular.all('me/locations').post({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }).then(function() {
                return getEtas();
            });
            requests.push(etas);
            requests.push(getPings());
            return $q.all(requests).
            finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        function getPings() {
            return Restangular.all('me/contacts/pings').getList().then(function(pings) {
                angular.forEach($scope.contacts, function(contact) {
                    delete contact.ping;

                    angular.forEach(pings, function(ping) {
                        if (contact.id === ping.contactId) {
                            contact.ping = ping;
                        }
                    });
                });
            });
        }

        function getEtas() {
            return Restangular.all('me/contacts/etas').getList().then(function(etas) {
                angular.forEach($scope.contacts, function(contact) {
                    delete contact.eta;
                    angular.forEach(etas, function(eta) {
                        if (contact.id === eta.contactId) {
                            contact.eta = eta;
                        }
                    });
                });
            });
        }
        // $scope.ping = function(contact) {
        //     var confirmPopup = $ionicPopup.confirm({
        //         title: 'Ping',
        //         template: 'Ping ' + contact.name + ' your location?'
        //     });
        //     confirmPopup.then(function(res) {
        //         if (res) {
        //             Restangular.one('me/contacts', contact.id).all('ping').post({});
        //         } else {
        //             console.log('You are not sure');
        //         }
        //     });
        /*
            var alertPopup = $ionicPopup.alert({
                title: 'Ping!',
                template: 'You pinged ' + contact.name + '.'
            });
            alertPopup.then(function() {
                console.log('Thank you for not eating my delicious ice cream cone');
            });
            Restangular.one('me/contacts', contact.id).all('ping').post({});*/
        // };

    });
