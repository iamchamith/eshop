module Ecart.Brands.View {
    const message = new Ecart.Messages.sweetAlerts();
    const baseApi = Ecart.GlobleConfig.baseApi;
    const prefix = baseApi + "/Brands";
    const read = prefix + "/ReadBrands";
    $(function () {

        init.initControlles();
        crud.read("0");
    });

    var init = {
        initControlles: function () {
            $('#gvBrands').kendoGrid({
                columns: [
                    { field: "brandId", hidden: true },
                    {
                        title: "Brand Image",
                        template: '<img src="#:image#" alt="#:brandName#" class="img-thumbnail entityThumbImage" />'
                    },
                    { field: "brandName" },
                    { field: "enable" },
                    { command: [
                            {
                                name: "View",
                                click: function (e) {
                                    var tr = $(e.target).closest("tr");
                                    var data = this.dataItem(tr);
                                    $(location).attr('href', "/admin/Brands/Setup?" + $.param({ mode: Number(Enums.CrudType.Update), id: data.brandId }));
                                }
                            },
                        ]
                    }
                ],
                filterable: true            
            });
        }
    }

    export var crud = {

        read: function (query) {
            new Ecart.Ajax.apiConnector().callservice(read, { id:query}, Ajax.webMethod.Get).done(
                function (e) {
                    console.log(e);
                    $('#gvBrands').data("kendoGrid").setDataSource(new kendo.data.DataSource({ data: e.data.content, pageSize: 10 }));
                });
        }
    }
}
 