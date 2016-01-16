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
    .directive('identicon', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                username: '=',
                size: '=',
                marginPx: '='
            },
            template: '<img width={{size}} height={{size}} ng-src="data:image/png;base64,{{data}}">',
            controller: function($scope, md5) {

                function centerImage(size, marginPx) {
                    // Identicons are a 5x5 grid (without margins)
                    var NUM_COLUMNS = 5;
                    // With margins, however it's a 6x6 grid where the 6th row and column are split in half
                    // and evenly spaced around the image, thus creating the margin.

                    // Users can pass in their own desired margin in pixels
                    if (typeof marginPx !== 'undefined') {
                        // convert their margin pixels into Identicon's expected percentage of size
                        return {margin: marginPx / size, naturalSize: size};
                    }

                    // Calculate an acceptable natural size and margin
                    var adjustment = (NUM_COLUMNS + 1) - (size % (NUM_COLUMNS + 1)); // adjustment needed to get a square fit for an identicon (divisble by 6)
                    var naturalSize = size + adjustment; // at most, we'd generate an icon that's 5px bigger than the size the user requested and scale it down.
                    marginPx = (naturalSize / (NUM_COLUMNS + 1)) / 2; // take a 6th of the newly calculated natural size and cut it in half for an even margin.

                    // convert the calculated margin pixels into Identicon's expected percentage of size
                    return {margin: marginPx / naturalSize, naturalSize: naturalSize};
                }

                function init() {
                    $scope.size = (typeof($scope.size) !== 'undefined' ? $scope.size : 24);

                    var adjustmentValues = centerImage($scope.size, $scope.marginPx);
                    $scope.margin = adjustmentValues.margin;
                    $scope.naturalSize = adjustmentValues.naturalSize;
                }

                init();

                $scope.$watchGroup(['username', 'size', 'marginPx'], function(newVal) {
                    init();
                    $scope.data = new Identicon(md5.createHash($scope.username || ''), $scope.naturalSize, $scope.margin).toString();
                });
            }
        };
    });
