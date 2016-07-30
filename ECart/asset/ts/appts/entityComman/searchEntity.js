var Ecart;
(function (Ecart) {
    var EntityHeader;
    (function (EntityHeader) {
        var baseApi = Ecart.Config.domains.baseUrl();
        $(document).ready(function () {
            init.initControlles();
            var browserUrl = window.location.href;
            var mode = new Ecart.Utility.url().getParameterByName("mode", browserUrl);
            if (Number(mode) == Number(Ecart.Enums.EntityType.Brands)) {
                var url = baseApi + "/Brands/search";
            }
            crud.read(url);
        });
        var init = {
            initControlles: function () {
                $("#ddSearch").kendoComboBox({
                    dataTextField: "text",
                    dataValueField: "value",
                    select: function (e) {
                        Ecart.Brands.View.crud.read(e.item.val());
                    }
                });
            }
        };
        var crud = {
            read: function (url) {
                new Ecart.Ajax.apiConnector().callservice(url, null, Ecart.Ajax.webMethod.Get).done(function (e) {
                    $("#ddSearch").data("kendoComboBox").setDataSource(new kendo.data.DataSource({ data: e.data.content }));
                    $("#ddSearch").data("kendoComboBox").select(0);
                });
            }
        };
    })(EntityHeader = Ecart.EntityHeader || (Ecart.EntityHeader = {}));
})(Ecart || (Ecart = {}));
//# sourceMappingURL=searchEntity.js.map