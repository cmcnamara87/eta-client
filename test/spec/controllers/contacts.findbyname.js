'use strict';

describe('Controller: ContactsFindbynameCtrl', function () {

  // load the controller's module
  beforeEach(module('etaApp'));

  var ContactsFindbynameCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContactsFindbynameCtrl = $controller('ContactsFindbynameCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
