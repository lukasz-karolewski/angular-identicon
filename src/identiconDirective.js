/**
 * @ngdoc directive
 * @name contactIcon
 *
 * @description
 * _Please update the description and restriction._
 *
 * @restrict A
 * */
angular.module('ui.identicon', ['md5'])
    .directive('identicon', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                email: '=',
                size: '='
            },
            template: '<img width={{size}} height={{size}} ng-src="data:image/png;base64,{{data}}">',
            controller: function ($scope, md5) {

                $scope.size = (typeof($scope.size) !== 'undefined' ? $scope.size : 24);

                $scope.$watch('email', function (newVal) {
                    if (newVal) {
                        $scope.data = new Identicon(md5.createHash(newVal || ''), $scope.size).toString();
                    }
                });
            }
        };
    });
