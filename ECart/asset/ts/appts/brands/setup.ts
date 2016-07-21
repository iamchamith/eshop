module Ecart.Brands.Setup {

   
    const baseApi = Ecart.Config.domains.baseUrl();
    const baseSite = "";
    const prefix = baseApi + "/Brands";
    const read = prefix + "/ReadBrandsById";
    const update = prefix + "/UpdateBrands";
    const deleted = prefix + "/DeleteBrand";
    const create = prefix + "/CreateBrands";
    const fileUpload = baseApi + "/Utilities/UploadFile";
    const filePath = "";
    const messages = new Ecart.Messages.sweetAlerts();

    $(function () {
        const browserUrl = window.location.href;
        const brandId = new Ecart.Utility.url().getParameterByName("id", browserUrl);
        $('#hndBrandId').val(brandId);
        const mode = new Ecart.Utility.url().getParameterByName("mode", browserUrl);
        $('#hndCrudType').val(mode);
        init.initControlles();
        init.lookups();
        if (Number(mode) == Number(Enums.CrudType.Update) || Number(mode) == Number(Enums.CrudType.Delete)) {
            init.load(brandId);
        }

        $(window).error(function () {
            $('#imgBrands').attr('src', baseApi + "/Files/Brands/no.jpg");
        });
    });

    var init = {
        initControlles: function () {
            $("#txtDiscription").kendoEditor({
                resizable: {
                    content: true,
                    toolbar: true
                }
            });
            $('#btnBrandsSave').click(function () {
                 if(Number($('#hndCrudType').val()) == Number(Enums.CrudType.Insert)){
                    crud.create(create);
                 } else {
                     crud.update(update);
                }
            });
            $('#btnBrandsDelete').click(function () { crud.delete(deleted) });

            $("#imgFile").kendoUpload({
                async: {
                    saveUrl: fileUpload + "?fileType=" + Number(Enums.FileType.Brands),
                    autoUpload: true
                },
                multiple: false,
                success: function (e) {
                    if (e.response.responseCode == Enums.ResponseCode.Success) {
                        $('#filePath').val(e.response.message);
                        $('#imgBrands').attr('src', e.response.content);
                        $('#hndFilePath').val(e.response.message);
                    } else if (e.response.responseCode == Enums.ResponseCode.ValidationError) {
                        alert('validation error');
                    } else {
                        new Ecart.Messages.sweetAlerts().errorAlert("error");
                        console.error(e.response);
                    }
                }
            });

        },
        load: function (e: string): void {
            crud.read(e);
        },
        lookups: function (): void {
            if (Number($('#hndCrudType').val()) == Number(Ecart.Enums.CrudType.Update) || Number($('#hndCrudType').val()) == Number(Ecart.Enums.CrudType.Delete)) {
                $('.btnDel').removeClass('hidden');
            }
            $('#imgBrands').attr('src', baseApi+"/Files/Brands/no.jpg");
        }
    }

    var crud = {
        read: function (e):void {
            new Ecart.Ajax.apiConnector().callservice(read, { id: e }, Ajax.webMethod.Get).done(function (e) {
                if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                    $('#txtBrandName').val(e.data.content.brandName);
                    $('#chkBrandEnable').prop("checked", e.data.content.enable);
                    $('#txtSeo').val(e.data.content.seo);
                    $('#txtDiscription').data('kendoEditor').value(e.data.content.brandDiscription);
                    $('#txtBrandName').val(e.data.content.brandName);
                    $('#hndFilePath').val(e.data.content.image);
                    $('#imgBrands').attr('src', e.data.content.imagePath);
                } else {
                    new Ecart.Messages.sweetAlerts().errorAlert("error");
                    console.error(e);
                }
            });
        },
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
                    BrandDiscription: $('#txtDiscription').data('kendoEditor').value(),
                    Seo: $('#txtSeo').val(),
                    Enable: $('#chkBrandEnable').is(":checked"),
                    Image: $('#filePath').val()
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
        update: function (url:string) {
            swal({
                title: "Sure update ?",
                type: "info",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
            }, function () {
                var data = {
                    BrandId: $('#hndBrandId').val(),
                    BrandName: $('#txtBrandName').val(),
                    BrandDiscription: $('#txtDiscription').data('kendoEditor').value(),
                    Seo: $('#txtSeo').val(),
                    Enable: $('#chkBrandEnable').is(":checked"),
                    Image: $('#hndFilePath').val()
                };
                new Ecart.Ajax.apiConnector().callservice(url, data, Ajax.webMethod.Post).done(function (e) {
                    console.log(e);
                    messages.successAlert("success");
                }).fail(function (e) {
                    messages.errorAlert("error");
                    console.error(e);
                });
            });  
        },
        delete: function (url: string): void {
            swal({
                title: "Sure delete ?",
                type: "info",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
            }, function () {
                var data = {
                    brandId: $('#hndBrandId').val()
                };
                new Ecart.Ajax.apiConnector().callservice(url, data, Ajax.webMethod.Post).done(function (e) {
                    console.log(e);
                    messages.successAlert("success");
                    $(location).attr("href",'/admin/Brands');
                }).fail(function (e) {
                    messages.errorAlert("error");
                    console.error(e);
                });
            });  
        },
        clean: function () {
            $('#txtBrandName').val("");
            $('#txtSeo').val("");
            $('#chkBrandEnable').prop("checked", true);
            $('#txtDiscription').data("kendoEditor").value("");
            $('#imgBrands').attr('src', $('#hndBaseBrandImage').val());
        }
    }


}