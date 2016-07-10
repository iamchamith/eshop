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
            var fileUpload = baseApi + "/Utilities/UploadFile";
            var filePath = "";
            var messages = new Ecart.Messages.sweetAlerts();
            $(function () {
                var browserUrl = window.location.href;
                var brandId = new Ecart.Utility.url().getParameterByName("id", browserUrl);
                $('#hndBrandId').val(brandId);
                var mode = new Ecart.Utility.url().getParameterByName("mode", browserUrl);
                $('#hndCrudType').val(mode);
                init.initControlles();
                init.lookups();
                if (Number(mode) == Number(Ecart.Enums.CrudType.Update) || Number(mode) == Number(Ecart.Enums.CrudType.Delete)) {
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
                        if (Number($('#hndCrudType').val()) == Number(Ecart.Enums.CrudType.Insert)) {
                            crud.create(create);
                        }
                        else {
                            crud.update(update);
                        }
                    });
                    $('#btnBrandsDelete').click(function () { crud.delete(deleted); });
                    $("#imgFile").kendoUpload({
                        async: {
                            saveUrl: fileUpload + "?fileType=0",
                            autoUpload: true
                        },
                        multiple: false,
                        success: function (e) {
                            if (e.response.responseCode == Ecart.Enums.ResponseCode.Success) {
                                $('#filePath').val(e.response.message);
                                $('#imgBrands').attr('src', e.response.content);
                                $('#hndFilePath').val(e.response.message);
                            }
                            else if (e.response.responseCode == Ecart.Enums.ResponseCode.ValidationError) {
                                alert('validation error');
                            }
                            else {
                                new Ecart.Messages.sweetAlerts().errorAlert("error");
                                console.error(e.response);
                            }
                        }
                    });
                },
                load: function (e) {
                    crud.read(e);
                },
                lookups: function () {
                    if (Number($('#hndCrudType').val()) == Number(Ecart.Enums.CrudType.Update) || Number($('#hndCrudType').val()) == Number(Ecart.Enums.CrudType.Delete)) {
                        $('.btnDel').removeClass('hidden');
                    }
                    $('#imgBrands').attr('src', baseApi + "/Files/Brands/no.jpg");
                }
            };
            var crud = {
                read: function (e) {
                    new Ecart.Ajax.apiConnector().callservice(read, { id: e }, Ecart.Ajax.webMethod.Get).done(function (e) {
                        if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                            $('#txtBrandName').val(e.data.content.brandName);
                            $('#chkBrandEnable').prop("checked", e.data.content.enable);
                            $('#txtSeo').val(e.data.content.seo);
                            $('#txtDiscription').data('kendoEditor').value(e.data.content.brandDiscription);
                            $('#txtBrandName').val(e.data.content.brandName);
                            $('#hndFilePath').val(e.data.content.image);
                            $('#imgBrands').attr('src', e.data.content.imagePath);
                        }
                        else {
                            new Ecart.Messages.sweetAlerts().errorAlert("error");
                            console.error(e);
                        }
                    });
                },
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
                            BrandDiscription: $('#txtDiscription').data('kendoEditor').value(),
                            Seo: $('#txtSeo').val(),
                            Enable: $('#chkBrandEnable').is(":checked"),
                            Image: $('#filePath').val()
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
                update: function (url) {
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
                        new Ecart.Ajax.apiConnector().callservice(url, data, Ecart.Ajax.webMethod.Post).done(function (e) {
                            console.log(e);
                            messages.successAlert("success");
                        }).fail(function (e) {
                            messages.errorAlert("error");
                            console.error(e);
                        });
                    });
                },
                delete: function (url) {
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
                        new Ecart.Ajax.apiConnector().callservice(url, data, Ecart.Ajax.webMethod.Post).done(function (e) {
                            console.log(e);
                            messages.successAlert("success");
                            $(location).attr("href", '/admin/Brands');
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
            };
        })(Setup = Brands.Setup || (Brands.Setup = {}));
    })(Brands = Ecart.Brands || (Ecart.Brands = {}));
})(Ecart || (Ecart = {}));
//# sourceMappingURL=setup.js.map