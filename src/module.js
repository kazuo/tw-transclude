import 'angular';
import twTransclude from './directives/twTransclude';

export default angular.module('twinwork.twTransclude', [])
    .directive('twTransclude', twTransclude);