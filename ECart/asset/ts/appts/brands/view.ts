module Ecart.Brands.View {
    const message = new Ecart.Messages.sweetAlerts();
    const baseApi = "http://localhost:16666";
    const prefix = baseApi + "/Brands";
    const read = prefix + "/ReadBrands";
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
                                    alert('navigated')
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
    }

    var crud = {

        read: function (url) {
            new Ecart.Ajax.apiConnector().callservice(url, null, Ajax.webMethod.Get).done(
                function (e) {
                    console.log(e);
                    $('#gvBrands').data("kendoGrid").setDataSource(new kendo.data.DataSource({ data: e.data.content, pageSize: 10 }));
                });
        }
    }
}
 