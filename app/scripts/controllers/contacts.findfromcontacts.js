'use strict';

angular.module('etaApp')
    .controller('ContactsFindFromContactsCtrl', function($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        console.log('this should work hopefully!');

        // var fields = ['displayName', 'name', 'emails'];
        var options = new ContactFindOptions();
        options.filter = '';
        options.multiple = true;
        // var fields = ['displayName', 'name', 'emails'];
        // navigator.contacts.find(fields, onSuccess, onError, options);

        navigator.contacts.find(['*'], function(people) {
            window.alert('Found ' + people.length + ' contacts.');
            $scope.$apply(function() {
                $scope.people = people;
            });
        }, null, options);

        // function onSuccess(contacts) {
        //     window.alert('Found ' + contacts.length + ' contacts.');
        //     for (var i = 0; i < contacts.length; i++) {
        //         console.log('Display Name = ' + contacts[i].displayName);
        //         console.log('Name = ' + contacts[i].name);
        //         console.log('Emails = ' + contacts[i].emails);
        //     }
        // }

        // function onError(contactError) {
        //     window.alert('onError!');
        //     console.log('contactError', contactError);
        // }

        // // find all contacts with 'Bob' in any name field
        // var options = new ContactFindOptions();
        // options.filter = 'Andrew';
        // options.multiple = true;
        // var fields = ['displayName', 'name', 'emails'];
        // navigator.contacts.find(fields, onSuccess, onError, options);



    });
