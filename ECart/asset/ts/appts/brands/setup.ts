module Ecart.Brands.Setup {

    const baseApi = "http://localhost:16666";
    const baseSite = "";
    const prefix = baseApi + "/Brands";
    const read = prefix + "/ReadBrandsById";
    const update = prefix + "/UpdateBrands";
    const deleted = prefix + "/DeleteBrand";
    const create = prefix + "/CreateBrands";
    const messages = new Ecart.Messages.sweetAlerts();
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
            $('#btnBrandsSave').click(function () { crud.create(create) });
        },
    }

    var crud = {

        read: function () { },
        create: function (url: string): any {
 
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

                new Ecart.Ajax.apiConnector().callservice(url, data, Ajax.webMethod.Post).done(function (e) {
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
    }


}