'use strict';

angular.module('etaApp')
    .factory('Push', function($rootScope, Restangular, ENV) {
        // Service logic
        // ...

        var deviceToken;

        // Public API here
        return {
            start: function() {
                // Whenever we log in, send the device id
                $rootScope.$watch('isLoggedIn', function(isLoggedIn, oldIsLoggedIn) {
                    if (!oldIsLoggedIn && isLoggedIn) {
                        Restangular.all('me/device').post({
                            id: deviceToken
                        });
                    }
                });

                if (ENV.name === 'phone') {

                    console.log('setting up push notificaitons');
                    var pushNotification = window.plugins.pushNotification;

                    //set push notification callback before we initialize the plugin
                    document.addEventListener('push-notification', function(event) {
                        //get the notification payload
                        var notification = event.notification;

                        //display alert to the user for example
                        window.alert(notification.aps.alert);

                        //clear the app badge
                        pushNotification.setApplicationIconBadgeNumber(0);
                    });

                    //initialize the plugin
                    pushNotification.onDeviceReady({
                        'pw_appid': 'C9585-0582F'
                    });

                    console.log('about to register');
                    //register for pushes
                    pushNotification.registerDevice(
                        function(status) {
                            console.log('=======REGISTERED DEIVCE=====', status['deviceToken']);
                            deviceToken = status['deviceToken'];
                            console.warn('registerDevice: ' + deviceToken);
                        },
                        function(status) {
                            console.warn('failed to register : ' + JSON.stringify(status));
                            window.alert(JSON.stringify(['failed to register ', status]));
                        }
                    );

                    //reset badges on app start
                    pushNotification.setApplicationIconBadgeNumber(0);
                }
            }
        };
    });
