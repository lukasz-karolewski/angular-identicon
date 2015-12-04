/**
 * @ngdoc directive
 * @name contactIcon
 *
 * @description
 * _Please update the description and restriction._
 *
 * @restrict A
 * */
angular.module('ui.identicon', [])
    .directive('identicon', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                username: '=',
                size: '=',
                marginPx: '='
            },
            template: '<img width={{size}} height={{size}} ng-src="data:image/png;base64,{{data}}">',
            controller: function ($scope, md5) {
				
				function calculateMargin(size, marginPx) {
					var NUM_COLUMNS = 5; // Identicons are a 5x5 grid
					var MIN_CELL_SIZE = 20; // We don't want the margin to "overpower" the cell size

					// Users can pass in their own desired margin in pixels
					if (typeof marginPx !== 'undefined') {
						// convert their margin pixels into Identicon's expected percentage of size
						return marginPx / size;
					}
					
					// Calculate an acceptable margin
					marginPx = (size % NUM_COLUMNS) / 2; // Any extra space can be margin space
					
					var cellSize = (size / NUM_COLUMNS);
					
					// For larger identicons with no extra space, make the margin 5.
					if (marginPx === 0 && cellSize > MIN_CELL_SIZE) {
						marginPx = 5;
					}
					
					// convert the calculated margin pixels into Identicon's expected percentage of size
					return marginPx / size;
				}
				
                $scope.size = (typeof($scope.size) !== 'undefined' ? $scope.size : 24);
                $scope.margin = calculateMargin($scope.size, $scope.marginPx);

                $scope.$watchGroup(['username', 'size', 'marginPx'], function (newVal) {
                    $scope.data = new Identicon(md5.createHash($scope.username || ''), $scope.size, $scope.margin).toString();
                });
            }
        };
    });
