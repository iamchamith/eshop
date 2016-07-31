var Ecart;
(function (Ecart) {
    var Items;
    (function (Items) {
        var View;
        (function (View) {
            var baseApi = Ecart.Config.domains.baseUrl();
            var readLookups = baseApi + '/Items/Lookups';
            var createItem = baseApi + '/Items/InsertItem';
            var fileUpload = baseApi + "/Utilities/UploadFile";
            var updateItem = baseApi + "/Utilities/UpdateItem";
            var deleteItem = baseApi + "/Utilities/DeleteItem";
            // images
            var insertImages = baseApi + "/Items/InsertImage";
            var deleteImage = baseApi + "/Items/DeleteImage";
            var updateImageDefault = baseApi + "/Items/UpdateImageDefault";
            var readImages = baseApi + "/Items/ReadImages";
            $(function () {
                init.initControlles();
                crud.lookupsRead();
                crud.readImages();
            });
            var init = {
                initControlles: function () {
                    $("#txtDiscription").kendoEditor({
                        resizable: {
                            content: true,
                            toolbar: true
                        }
                    });
                    $('#ddBrand').kendoComboBox({
                        filter: "startswith",
                        dataTextField: "brandName",
                        dataValueField: "brandId",
                        template: '<table><tr><td><img src="#:image#" alt="..." class="img-thumbnail" width="50px" height="50px"></td><td>&nbsp;&nbsp;</td><td><h3>#:brandName #</h3></td></tr></table>',
                        height: 400
                    });
                    //$('#ddCategories').kendoMultiSelect({
                    //    dataTextField: "name",
                    //    dataValueField: "category_Id"
                    //});
                    $('#txtPrice').kendoNumericTextBox();
                    $('#btnItemsSave').click(function () {
                        crud.createItem($(this).attr('id'));
                    });
                    $('#flItemImages').kendoUpload({
                        async: {
                            saveUrl: fileUpload + "?fileType=" + Number(Ecart.Enums.FileType.Products),
                            autoUpload: true
                        },
                        multiple: false,
                        success: function (e) {
                            if (e.response.responseCode == Ecart.Enums.ResponseCode.Success) {
                                $('#imgProductMain').attr('src', e.response.content);
                                $('#hndProductImage').val(e.response.message);
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
                    $('#btnImageUpload').click(function () {
                        crud.uploadImage($(this).attr('id'));
                    });
                    $('#gvItemImages').kendoGrid({
                        columns: [
                            { field: "", hidden: true },
                            { field: "", hidden: true }
                        ]
                    });
                }
            };
            var crud = {
                lookupsRead: function () {
                    new Ecart.Ajax.apiConnector().callservice(readLookups, null, Ecart.Ajax.webMethod.Get).done(function (e) {
                        console.log(e);
                        // bind brands
                        if (e.data.brands.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                            $('#ddBrand').data("kendoComboBox").setDataSource(new kendo.data.DataSource({ data: e.data.brands.content }));
                        }
                        else {
                            new Ecart.Messages.sweetAlerts().errorAlert("binding brands has some error");
                        }
                        //if (e.data.cat.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                        //    $('#ddCategories').data("kendoMultiSelect").setDataSource(new kendo.data.DataSource({ data: e.data.cat.content }));
                        //} else {
                        //    new Messages.sweetAlerts().errorAlert("binding category has some error");
                        //}
                    });
                },
                readItemsInfo: function () { },
                createItem: function (element) {
                    var caption = $('#' + element).val();
                    swal({
                        title: "Sure insert ?",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    }, function () {
                        Ecart.Animation.ajaxRequest.startWaiting(element);
                        new Ecart.Ajax.apiConnector().callservice(createItem, {
                            Discription: $('#txtDiscription').data("kendoEditor").value(),
                            Seo: $('#txtSeo').val(),
                            Enable: $('#chkItemEnable').is(":checked"),
                            BrandId: $('#ddBrand').data("kendoComboBox").value(),
                            Price: $('#txtPrice').data("kendoNumericTextBox").value(),
                            Name: $('#txtItemName').val()
                        }, Ecart.Ajax.webMethod.Post).done(function (e) {
                            if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                                $('#hndProductId').val(e.data.content);
                                new Ecart.Messages.sweetAlerts().successAlert("insert is success");
                            }
                            else if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.ValidationError)) {
                                new Ecart.Messages.sweetAlerts().errorAlert("validation error");
                            }
                            else {
                                console.error(e);
                                new Ecart.Messages.sweetAlerts().errorAlert();
                            }
                        }).always(function () {
                            Ecart.Animation.ajaxRequest.stopWaiting(element, caption);
                        });
                    });
                },
                updateItem: function (element) {
                    var caption = $('#' + element).val();
                    swal({
                        title: "Sure update ?",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    }, function () {
                        Ecart.Animation.ajaxRequest.startWaiting(element);
                        new Ecart.Ajax.apiConnector().callservice(updateImageDefault, {
                            Discription: $('#txtDiscription').data("kendoEditor").value(),
                            Seo: $('#txtSeo').val(),
                            Enable: $('#chkItemEnable').is(":checked"),
                            BrandId: $('#ddBrand').data("kendoComboBox").value(),
                            Price: $('#txtPrice').data("kendoNumericTextBox").value(),
                            Name: $('#txtItemName').val()
                        }, Ecart.Ajax.webMethod.Post).done(function (e) {
                            if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                                new Ecart.Messages.sweetAlerts().successAlert("update is success");
                            }
                            else if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.ValidationError)) {
                                new Ecart.Messages.sweetAlerts().errorAlert("validation error");
                            }
                            else {
                                console.error(e);
                                new Ecart.Messages.sweetAlerts().errorAlert();
                            }
                        }).always(function () {
                            Ecart.Animation.ajaxRequest.stopWaiting(element, caption);
                        });
                    });
                },
                deleteItem: function (element) {
                    var caption = $('#' + element).val();
                    swal({
                        title: "Sure delete ?",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    }, function () {
                        Ecart.Animation.ajaxRequest.startWaiting(element);
                        new Ecart.Ajax.apiConnector().callservice(updateImageDefault, {
                            itemId: $('#hndProductId').val()
                        }, Ecart.Ajax.webMethod.Post).done(function (e) {
                            if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                                new Ecart.Messages.sweetAlerts().successAlert("delete is success");
                            }
                            else if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.ValidationError)) {
                                new Ecart.Messages.sweetAlerts().errorAlert("validation error");
                            }
                            else {
                                console.error(e);
                                new Ecart.Messages.sweetAlerts().errorAlert();
                            }
                        }).always(function () {
                            Ecart.Animation.ajaxRequest.stopWaiting(element, caption);
                        });
                    });
                },
                // function about images
                uploadImage: function (element) {
                    if ($('#hndProductId').val() === "0") {
                        new Ecart.Messages.sweetAlerts().errorAlert("please create a item");
                        return;
                    }
                    var caption = $('#' + element).val();
                    swal({
                        title: "Sure upload ?",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    }, function () {
                        Ecart.Animation.ajaxRequest.startWaiting(element);
                        new Ecart.Ajax.apiConnector().callservice(insertImages, {
                            imageId: $('#hndProductImage').val(),
                            productId: $('#hndProductId').val()
                        }, Ecart.Ajax.webMethod.Post).done(function (e) {
                            if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                                new Ecart.Messages.sweetAlerts().successAlert("upload is success");
                                crud.readImages();
                            }
                            else if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.ValidationError)) {
                                new Ecart.Messages.sweetAlerts().errorAlert("validation error");
                            }
                            else {
                                console.error(e);
                                new Ecart.Messages.sweetAlerts().errorAlert();
                            }
                        }).always(function () {
                            Ecart.Animation.ajaxRequest.stopWaiting(element, caption);
                        });
                    });
                },
                setToDefaultImage: function () { },
                deleteImage: function () {
                    swal({
                        title: "Sure delete ?",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    }, function () {
                        new Ecart.Ajax.apiConnector().callservice(deleteImage, {
                            imageId: $('#hndProductImage').val()
                        }, Ecart.Ajax.webMethod.Post).done(function (e) {
                            if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                                new Ecart.Messages.sweetAlerts().successAlert("delete is success");
                                crud.readImages();
                            }
                            else if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.ValidationError)) {
                                new Ecart.Messages.sweetAlerts().errorAlert("validation error");
                            }
                            else {
                                console.error(e);
                                new Ecart.Messages.sweetAlerts().errorAlert();
                            }
                        });
                    });
                },
                readImages: function () {
                    new Ecart.Ajax.apiConnector().callservice(readImages, null, Ecart.Ajax.webMethod.Get).done(function (e) {
                        if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                            new Ecart.Messages.sweetAlerts().successAlert("delete is success");
                            crud.readImages();
                        }
                        else if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.ValidationError)) {
                            new Ecart.Messages.sweetAlerts().errorAlert("validation error");
                        }
                    });
                },
            };
        })(View = Items.View || (Items.View = {}));
    })(Items = Ecart.Items || (Ecart.Items = {}));
})(Ecart || (Ecart = {}));
//# sourceMappingURL=setup.js.map