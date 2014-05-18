'use strict';

describe('Controller: ContactDetailCtrl', function() {

    // load the controller's module
    beforeEach(module('etaApp'));

    var ContactDetailCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        ContactDetailCtrl = $controller('ContactDetailCtrl', {
            $scope: scope
        });
    }));

    it('should attach a list of awesomeThings to the scope', function() {
        expect(scope.awesomeThings.length).toBe(3);
    });
});
