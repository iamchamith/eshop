var Ecart;
(function (Ecart) {
    var Brands;
    (function (Brands) {
        var View;
        (function (View) {
            var message = new Ecart.Messages.sweetAlerts();
            var baseApi = Ecart.Config.domains.baseUrl();
            var prefix = baseApi + "/Brands";
            var read = prefix + "/ReadBrands";
            $(function () {
                init.initControlles();
                View.crud.read("0");
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
                                title: "action",
                                command: [
                                    {
                                        name: "View",
                                        click: function (e) {
                                            var tr = $(e.target).closest("tr");
                                            var data = this.dataItem(tr);
                                            $(location).attr('href', "/admin/Brands/Setup?" + $.param({ mode: Number(Ecart.Enums.CrudType.Update), id: data.brandId }));
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
                        if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                            $('#gvBrands').data("kendoGrid").setDataSource(new kendo.data.DataSource({ data: e.data.content, pageSize: 10 }));
                            View.crud.bindImageToSlider(e.data.content);
                        }
                        else {
                            new Ecart.Messages.sweetAlerts().errorAlert();
                        }
                    });
                },
                bindImageToSlider: function (data) {
                    $.each(data, function (i, d) {
                        if (d.enable) {
                            $("#Brand_slider").append('<img class="sliderItem"  width="285" height="285" src="' + d.image + '" />');
                        }
                    });
                }
            };
        })(View = Brands.View || (Brands.View = {}));
    })(Brands = Ecart.Brands || (Ecart.Brands = {}));
})(Ecart || (Ecart = {}));
//# sourceMappingURL=view.js.map