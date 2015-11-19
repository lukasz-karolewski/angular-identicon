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
     * Ensures naturalSize calculation is correct based on provided size and
     * no provided naturalSize.
     * */
    it('should calculate a valid natural size', function() {
        expect($scope.naturalSize).toBe(34);
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
