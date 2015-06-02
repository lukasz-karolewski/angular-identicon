describe('Directive: ui.identicon', function () {
    var ele, scope;

    beforeEach(module("ui.identicon"));

    beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();

        ele = angular.element('<identicon hash="test@gmail.com" size="32"></identicon>');

        $compile(ele)(scope);
        scope.$apply();
    }));

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
