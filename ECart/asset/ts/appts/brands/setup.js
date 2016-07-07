var Ecart;
(function (Ecart) {
    var Brands;
    (function (Brands) {
        var Setup;
        (function (Setup) {
            var baseApi = "http://localhost:16666";
            var baseSite = "";
            var prefix = baseApi + "/Brands";
            var read = prefix + "/ReadBrandsById";
            var update = prefix + "/UpdateBrands";
            var deleted = prefix + "/DeleteBrand";
            var create = prefix + "/CreateBrands";
            var messages = new Ecart.Messages.sweetAlerts();
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
                    $('#btnBrandsSave').click(function () { crud.create(create); });
                },
            };
            var crud = {
                read: function () { },
                create: function (url) {
                    swal({
                        title: "Sure insert",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    }, function () {
                        var data = {
                            BrandName: $('#txtBrandName').val(),
                            BrandDiscription: $('#txtDiscription').val(),
                            Seo: $('#txtSeo').val(),
                            Enable: $('#chkBrandEnable').is(":checked")
                        };
                        new Ecart.Ajax.apiConnector().callservice(url, data, Ecart.Ajax.webMethod.Post).done(function (e) {
                            console.log(e);
                            messages.successAlert("success");
                            crud.clean();
                        }).fail(function (e) {
                            messages.errorAlert("error");
                            console.error(e);
                        });
                    });
                },
                update: function () { },
                delete: function () { },
                clean: function () {
                    $('#txtBrandName').val("");
                    $('#txtSeo').val("");
                    $('#chkBrandEnable').prop("checked", false);
                }
            };
        })(Setup = Brands.Setup || (Brands.Setup = {}));
    })(Brands = Ecart.Brands || (Ecart.Brands = {}));
})(Ecart || (Ecart = {}));
