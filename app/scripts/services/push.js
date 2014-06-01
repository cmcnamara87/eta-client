'use strict';

angular.module('etaApp')
    .factory('Push', function($rootScope, Restangular, ENV, $ionicPopup) {
        // Service logic
        // ...

        var deviceToken;

        /**
         * Sends the users device token when they are logged in
         * @param  {[type]} token The token to send
         * @return {[type]}       [description]
         */

        function sendDeviceToken(token) {
            if ($rootScope.isLoggedIn) {
                Restangular.all('me/device').post({
                    id: token
                });
            } else {
                $rootScope.$watch('isLoggedIn', function(isLoggedIn) {
                    if (isLoggedIn) {
                        Restangular.all('me/device').post({
                            id: token
                        });
                    }
                });
            }
        }

        // Public API here
        return {
            start: function() {
                // Whenever we log in, send the device id


                if (ENV.name === 'phone') {
                    console.log('DEVICE IS', ionic.Platform.device());

                    console.log('setting up push notificaitons');
                    var pushNotification = window.plugins.pushNotification;

                    console.log('got plugin', pushNotification);

                    //set push notification callback before we initialize the plugin
                    document.addEventListener('push-notification', function(event) {
                        //get the notification payload
                        var notification = event.notification;

                        //display alert to the user for example
                        // window.alert(notification.aps.alert);

                        $ionicPopup.alert({
                            title: 'You got pinged!',
                            template: notification.aps.alert
                        });
                        // alertPopup.then(function(res) {
                        //     console.log('Thank you for not eating my delicious ice cream cone');
                        // });
                        // };

                        //clear the app badge
                        pushNotification.setApplicationIconBadgeNumber(0);
                    });



                    //initialize the plugin
                    if (ionic.Platform.isAndroid()) {
                        pushNotification.onDeviceReady({
                            projectid: '481432854615',
                            appid: 'C9585-0582F'
                        });
                    } else if (ionic.Platform.isIOS()) {
                        pushNotification.onDeviceReady({
                            'pw_appid': 'C9585-0582F'
                        });
                    }


                    console.log('about to register');
                    //register for pushes
                    if (ionic.Platform.isAndroid()) {
                        pushNotification.registerDevice(
                            function(status) {
                                // var pushToken = status;
                                // console.warn('push token: ' + pushToken);
                                sendDeviceToken(status);
                                // Restangular.all('me/device').post({
                                //     id: status
                                // });
                            },
                            function(status) {
                                console.warn(JSON.stringify(['failed to register ', status]));
                            }
                        );
                    } else if (ionic.Platform.isIOS()) {
                        pushNotification.registerDevice(
                            function(status) {
                                console.log('=======REGISTERED DEIVCE=====', status['deviceToken']);
                                // deviceToken = status['deviceToken'];
                                sendDeviceToken(status['deviceToken']);
                                // Restangular.all('me/device').post({
                                //     id: status['deviceToken']
                                // });
                                console.warn('registerDevice: ' + deviceToken);
                            },
                            function(status) {
                                console.warn('failed to register : ' + JSON.stringify(status));
                                window.alert(JSON.stringify(['failed to register ', status]));
                            }
                        );
                    }


                    //reset badges on app start
                    pushNotification.setApplicationIconBadgeNumber(0);
                }
            }
        };
    });
