'use strict';

describe('Controller: ContactsFindfromcontactsCtrl', function () {

  // load the controller's module
  beforeEach(module('etaApp'));

  var ContactsFindfromcontactsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContactsFindfromcontactsCtrl = $controller('ContactsFindfromcontactsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
