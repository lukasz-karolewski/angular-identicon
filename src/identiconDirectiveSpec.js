describe('Directive: ui.identicon', function () {
    var ele, scope;

    beforeEach(module("ui.identicon"));

    beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();

        ele = angular.element('<identicon username="test@gmail.com" size="32"></identicon>');

        $compile(ele)(scope);
        scope.$apply();
    }));

    /**
     * @description
     * Ensures natural size calculation is correct based on provided size and
     * no provided marginPx.
     * */
    it('should generate a larger image and scale to ensure even margins', function() {
        expect($scope.naturalSize).toBe(36);
    });

    /**
     * @description
     * Sample test case to check if HTML rendered by the directive is non empty
     * */
    it('should do what i say', function () {
        scope.$apply(function () {

        });
        expect(true).toBeTruthy();
    });

});
