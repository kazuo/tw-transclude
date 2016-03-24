'use strict';

import 'angular';
import 'angular-mocks';
import $ from 'jquery';

describe('twTransclude directive', function () {
    var controller, element, body, scope;

    beforeEach(module('test.twTranscludeTest'));
    beforeEach(module('twinwork.twTransclude'));

    beforeEach(inject(function ($compile, $rootScope) {
        var body = `
<div class="container" ng-controller="TranscludeTestControler as vm" ng-cloak>
    <div class="row">
        <div class="col-sm-12">

            <h1>twBusinessCard directive</h1>
            <p><a href="https://github.com/kazuo/tw-business-card">On Github</a></p>

            <!-- tw-business-card demo -->
            <tw-business-card ng-repeat="contact in vm.contacts" data-contact="contact"></tw-business-card>
            <tw-business-card></tw-business-card>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <tw-transclude-test class="first" option-as="contact" options="vm.contacts" header="twTest simple interpolation">
                {{contact.email}}
            </tw-transclude-test>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <tw-transclude-test class="second" option-as="contact" options="vm.contacts" header="twTest w/ ngIf">
                <span ng-bind-html="contact.email"></span><br/>
                {{$index}}
                <span ng-if="$index % 2 === 0 " ng-bind-html="contact.name">
                </span>
            </tw-transclude-test>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <tw-transclude-test class="third" options="vm.contacts" header="twTest without transclude">

            </tw-transclude-test>
        </div>
    </div>
</div>
        `;
        scope = $rootScope.$new();
        element = angular.element(window.document).find('body');
        element.empty();
        element.append(body);
        element = $compile(element)(scope);
        scope.$apply();
    }));

    it('should contain a .container', function () {
        expect(!!$('.container').length).to.be.true;
    });
});