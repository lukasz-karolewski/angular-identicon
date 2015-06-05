angular.module('demo', ['ui.identicon'])
    .controller('demoCtrl', function ($scope, $timeout) {
        $scope.username = '';
        $scope.size = 300;


        function type(text, letterDelay) {
            $timeout(function () {
                $scope.username += text.substring(0, 1);

                var remainingText = text.substring(1, text.length);
                if (remainingText) {
                    type(remainingText, letterDelay);
                }
            }, letterDelay);
        }

        type('someemail@gmail.com', 500);
    });