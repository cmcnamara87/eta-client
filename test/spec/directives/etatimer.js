'use strict';

describe('Directive: etaTimer', function() {

    // load the directive's module
    beforeEach(module('etaApp'));

    var element,
        scope;

    beforeEach(inject(function($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should make hidden element visible', inject(function($compile) {
        element = angular.element('<eta-timer></eta-timer>');
        element = $compile(element)(scope);
        expect(element.text()).toBe('this is the etaTimer directive');
    }));
});
