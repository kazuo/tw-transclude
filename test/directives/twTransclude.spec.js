'use strict';

import 'angular';
import 'angular-mocks';

describe('twTransclude directive', function () {
    var controller, element, body, scope;

    beforeEach(module('twinwork.twTransclude'));

    beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();
        element = angular.element(window.document).find('body');
        element.empty();
        element = $compile(element)(scope);
        scope.$apply();
    }));

    it('should test twTransclude', function () {

    });
});