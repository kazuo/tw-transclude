import 'angular';
import 'angular-sanitize';
import './../../src/module';

angular.module('test.twTranscludeTest', ['twinwork.twTransclude', 'ngSanitize'])
    .controller('TranscludeTestControler', [function () {
        this.contacts = [
            {
                name: 'Rey E. Marin Jr.',
                title: 'Software Engineer',
                email: 'rey.marin@twinwork.net',
                phone: '+1 (626) 217-0117',
                oneLiner: '$ vagrant up'
            },
            {
                name: 'Neafevoc K. Marindale',
                title: 'Magician',
                email: 'neafevoc@twinwork.net',
                phone: '+1 (808) 867-5309',
                oneLiner: '"Watch this!"'
            },
            {
                name: 'Richard Winters',
                title: 'Captain',
                email: 'richard.d.winters@twinwork.net',
                oneLiner: "Hang tough"
            },
            {
                name: 'Johnny B. Good',
                title: 'Musician',
                email: 'johnny.b.good@twinwork.net',
                phone: '+1 (818) 555-1234',
                oneLiner: "Rock On!"
            },
            {
                name: 'Jane Deaux',
                title: 'Officer Manager',
                email: 'jane.deaux@twinwork.net',
                phone: '+1 (323) 555-4321',
                oneLiner: ":)"
            }
        ];
    }])
    .directive('twTranscludeTest', [function () {
        return {
            restrict: 'E',
            template: `
            <h1>{{vm.header}}</h1>
            Type something to highlight <input type="text" ng-model="vm.filter">
            <ul>
                <li ng-repeat="option in vm.options" tw-transclude tw-transclude-map="{option: vm.optionAs}">
                    {{option.name}}
                </li>
            </ul>
            `,
            transclude: true,
            bindToController: true,
            controllerAs: 'vm',
            scope: {
                header: '@',
                options: '=?',
                optionAs: '@'
            },
            controller: ['$scope', function ($scope) {
                var vm = this;

                this.header = this.header || "twTest";
                this.optionAs = this.optionAs || 'option';

                $scope.$watch(function () {
                    return vm.filter;
                }, function (filter) {
                    // expose for transclude
                    $scope.filter = filter;
                });
            }],
            link: function (scope, elem) {
                elem.addClass('tw-test');
            }
        }
    }]);