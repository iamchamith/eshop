var Ecart;
(function (Ecart) {
    var Categories;
    (function (Categories) {
        var View;
        (function (View) {
            var message = new Ecart.Messages.sweetAlerts();
            var baseApi = Ecart.Config.domains.baseUrl();
            var prefix = baseApi + "/Categories";
            var read = prefix + "/ReadCategories";
            $(function () {
                init.initControlles();
                View.crud.read("0");
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
                            { field: "name", title: "Category name" },
                            { field: "enable" },
                            {
                                command: [
                                    {
                                        name: "View",
                                        click: function (e) {
                                            var tr = $(e.target).closest("tr");
                                            var data = this.dataItem(tr);
                                            $(location).attr('href', "/admin/Categories/Setup?" + $.param({ mode: Number(Ecart.Enums.CrudType.Update), id: data.category_Id }));
                                        }
                                    },
                                ]
                            }
                        ],
                        filterable: true
                    });
                }
            };
            View.crud = {
                read: function (query) {
                    new Ecart.Ajax.apiConnector().callservice(read, { id: query }, Ecart.Ajax.webMethod.Get).done(function (e) {
                        console.log(e);
                        $('#gvCategories').data("kendoGrid").setDataSource(new kendo.data.DataSource({ data: e.data.content, pageSize: 10 }));
                    });
                }
            };
        })(View = Categories.View || (Categories.View = {}));
    })(Categories = Ecart.Categories || (Ecart.Categories = {}));
})(Ecart || (Ecart = {}));
//# sourceMappingURL=view.js.map