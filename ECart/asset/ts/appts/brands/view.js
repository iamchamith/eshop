var Ecart;
(function (Ecart) {
    var Brands;
    (function (Brands) {
        var View;
        (function (View) {
            var message = new Ecart.Messages.sweetAlerts();
            var baseApi = "http://localhost:16666";
            var prefix = baseApi + "/Brands";
            var read = prefix + "/ReadBrands";
            $(function () {
                init.initControlles();
                crud.read(read);
            });
            var init = {
                initControlles: function () {
                    $('#gvBrands').kendoGrid({
                        columns: [
                            { field: "brandId", hidden: true },
                            { field: "brandName" },
                            { field: "enable" },
                            { command: [
                                    {
                                        name: "view",
                                        click: function (e) {
                                            alert('navigated');
                                        }
                                    },
                                    {
                                        name: "delete",
                                        click: function (e) {
                                        }
                                    } // built-in "destroy" command
                                ]
                            }
                        ],
                        filterable: true
                    });
                }
            };
            var crud = {
                read: function (url) {
                    new Ecart.Ajax.apiConnector().callservice(url, null, Ecart.Ajax.webMethod.Get).done(function (e) {
                        console.log(e);
                        $('#gvBrands').data("kendoGrid").setDataSource(new kendo.data.DataSource({ data: e.data.content, pageSize: 10 }));
                    });
                }
            };
        })(View = Brands.View || (Brands.View = {}));
    })(Brands = Ecart.Brands || (Ecart.Brands = {}));
})(Ecart || (Ecart = {}));
