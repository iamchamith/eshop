var Ecart;
(function (Ecart) {
    var Brands;
    (function (Brands) {
        var View;
        (function (View) {
            $(function () {
                init.initControlles();
            });
            var init = {
                initControlles: function () {
                    $("#txtDiscription").kendoEditor({
                        resizable: {
                            content: true,
                            toolbar: true
                        }
                    });
                    $("#ddCategoryParent").kendoComboBox({
                        dataValueField: "value",
                        dataTextField: "text"
                    });
                }
            };
        })(View = Brands.View || (Brands.View = {}));
    })(Brands = Ecart.Brands || (Ecart.Brands = {}));
})(Ecart || (Ecart = {}));
//# sourceMappingURL=setup.js.map