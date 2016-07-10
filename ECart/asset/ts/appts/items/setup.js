var Ecart;
(function (Ecart) {
    var Brands;
    (function (Brands) {
        var View;
        (function (View) {
            var baseApi = "http://localhost:16666";
            $(function () {
                var browserUrl = window.location.href;
                var mode = new Ecart.Utility.url().getParameterByName("mode", browserUrl);
                if (Number(mode) == Number(Ecart.Enums.EntityType.Brands)) {
                    var url = baseApi + "/Brands/search";
                }
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
                    $('#ddBrand').kendoComboBox();
                    $('#ddCategories').kendoMultiSelect();
                }
            };
        })(View = Brands.View || (Brands.View = {}));
    })(Brands = Ecart.Brands || (Ecart.Brands = {}));
})(Ecart || (Ecart = {}));
//# sourceMappingURL=setup.js.map