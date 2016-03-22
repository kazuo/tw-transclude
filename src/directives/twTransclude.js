'use strict';

/**
 * @ngdoc directive
 * @name twinwork.twTransclude.directive:twTransclude
 * @restrict EA
 * @description A directive that can optionally take a mapping for scope. By deafult, the normal ngTransclude will
 * transclude elements and evaluate any expressions in the original compiled context. Using this directive gives
 * you the option to evaluate an expression in a different context
 * @param {object} [twTranscludeMap] A map with the format {mapOnto: mapFrom}
 */
export default function twTransclude()
{
    return {
        restrict: 'EA',
        link: function (scope, elem, attrs, ctrl, transclude) {
            var map = {};

            if (angular.isString(attrs.twTranscludeMap) && attrs.twTranscludeMap.length) {
                map = scope.$eval(attrs.twTranscludeMap);
            }

            transclude(scope, function (clone) {
                for (var m in map) {
                    // Do not engage when:
                    //  Normal for .. in object check
                    //  Existing scope does not have the property we want to map from
                    //  Existing scope already has and existing property of where we want to map to
                    if (!map.hasOwnProperty(m) || !scope.hasOwnProperty(m) || scope.hasOwnProperty(map[m])) {
                        continue;
                    }

                    // todo need to $eval an expression or set an expression... unsure if that's possible
                    scope[map[m]] = scope[m];
                }

                if (clone.length === 1 && clone.html() || clone.length > 1) {
                    elem.empty().append(clone);
                }
            });
        }
    };
}