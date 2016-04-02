'use strict';

import 'angular';
import 'angular-mocks';
import $ from 'jquery';

describe('twTransclude directive with test app', function () {
    var controller, element, body, scope;

    beforeEach(module('test.twTranscludeTest'));
    beforeEach(module('twinwork.twTransclude'));

    beforeEach(inject(function ($compile, $rootScope) {
        var body = `
        <div class="container" ng-controller="TranscludeTestControler as vm" ng-cloak>
            <div class="row">
            <div class="row">
                <div class="col-sm-12">
                    <tw-transclude-test class="first"
                        option-as="contact"
                        options="vm.contacts"
                        header="twTest simple interpolation">
                        {{contact.email}}
                    </tw-transclude-test>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <tw-transclude-test class="second"
                        option-as="contact"
                        options="vm.contacts"
                        header="twTest w/ ngIf">

                        <span class="contact-email" ng-bind-html="contact.email"></span><br/>
                        <span class="index">{{$index}}</span>
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

    it('should have rendered the first set of twTranscludeTest elements', function () {
        var $first = $('.first li');
        expect($first.length).to.be.equal(5);
        expect($first.eq(0).text().trim()).to.be.equal('rey.marin@twinwork.net');
        expect($first.eq(1).text().trim()).to.be.equal('neafevoc@twinwork.net');
        expect($first.eq(2).text().trim()).to.be.equal('richard.d.winters@twinwork.net');
        expect($first.eq(3).text().trim()).to.be.equal('johnny.b.good@twinwork.net');
        expect($first.eq(4).text().trim()).to.be.equal('jane.deaux@twinwork.net');
    });

    it('should have rendered the second set of twTranscludeTest elements', function () {
        var $second = $('.second li');

        expect($second.find('.index').eq(0).text().trim()).to.be.equal("0");
        expect($second.find('.index').eq(1).text().trim()).to.be.equal("1");
        expect($second.find('.index').eq(2).text().trim()).to.be.equal("2");
        expect($second.find('.index').eq(3).text().trim()).to.be.equal("3");
        expect($second.find('.index').eq(4).text().trim()).to.be.equal("4");

        expect($second.find('.contact-email').eq(0).text().trim()).to.be.equal('rey.marin@twinwork.net');
        expect($second.find('.contact-email').eq(1).text().trim()).to.be.equal('neafevoc@twinwork.net');
        expect($second.find('.contact-email').eq(2).text().trim()).to.be.equal('richard.d.winters@twinwork.net');
        expect($second.find('.contact-email').eq(3).text().trim()).to.be.equal('johnny.b.good@twinwork.net');
        expect($second.find('.contact-email').eq(4).text().trim()).to.be.equal('jane.deaux@twinwork.net');
    });
});