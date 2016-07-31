module Ecart.Categories.View {
    const message = new Ecart.Messages.sweetAlerts();
    const baseApi = Ecart.Config.domains.baseUrl();
    const prefix = baseApi + "/Categories";
    const read = prefix + "/ReadCategories";
    $(function () {

        init.initControlles();
        crud.read("0");
    });

    var init = {
        initControlles: function () {
            $('#gvCategories').kendoGrid({
                columns: [
                    { field: "category_Id", hidden: true },
                    {
                        title: "Category Image",
                        template: '<img src="#:image#" alt="#:name#" class="img-thumbnail entityThumbImage" />'
                    },
                    { field: "name", title:"Category name" },
                    {
                        template: '<img src="../../asset/images/icons/#= enable ?"yes.png" :"no.png"#" />',
                        field: "enable",
                        title: "enable",
                        width: 150,
                        filterable: {
                            multi: true
                        }
                    },
                    {
                        command: [
                            {
                                name: "View",
                                click: function (e) {
                                    var tr = $(e.target).closest("tr");
                                    var data = this.dataItem(tr);
                                    $(location).attr('href', "/admin/Categories/Setup?" + $.param({ mode: Number(Enums.CrudType.Update), id: data.category_Id }));
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
            new Ecart.Ajax.apiConnector().callservice(read, { id: query }, Ajax.webMethod.Get).done(
                function (e) {
                    console.log(e);
                    $('#gvCategories').data("kendoGrid").setDataSource(new kendo.data.DataSource({ data: e.data.content, pageSize: 10 }));
                });
        }
    }
}
