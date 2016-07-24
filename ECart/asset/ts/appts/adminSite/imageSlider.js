var Ecart;
(function (Ecart) {
    var AdminSite;
    (function (AdminSite) {
        var SiteImage;
        (function (SiteImage) {
            var read = Ecart.Config.domains.baseUrl() + "/SiteSettings/ImageSliderReadImage";
            var insert = Ecart.Config.domains.baseUrl() + "/SiteSettings/ImageSliderInsertImage";
            var deleted = Ecart.Config.domains.baseUrl() + "/SiteSettings/ImageSliderDeleteImage";
            var changeOrder = Ecart.Config.domains.baseUrl() + "/SiteSettings/ImageSliderChangeOrder";
            var messages = new Ecart.Messages.sweetAlerts();
            var fileUpload = Ecart.Config.domains.baseUrl() + "/Utilities/UploadFile";
            var filePath = Ecart.Config.domains.baseUrl() + "/Files/ImageSlider";
            $(function () {
                init.initControllers();
                crud.readImages();
            });
            var init = {
                initControllers: function () {
                    $("#flImage").kendoUpload({
                        async: {
                            saveUrl: fileUpload + "?fileType=" + Number(Ecart.Enums.FileType.ImageSlider),
                            autoUpload: true
                        },
                        multiple: false,
                        success: function (e) {
                            if (e.response.responseCode == Ecart.Enums.ResponseCode.Success) {
                                $('#imgSlider').attr('src', e.response.content);
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
                    $('#btnUploadFile').click(function () {
                        crud.insertImage($(this).attr('id'));
                    });
                    $('#gvImages').kendoGrid({
                        columns: [
                            {
                                title: "image",
                                hidden: true
                            },
                            {
                                title: "Image",
                                template: '<img src="' + filePath + '/#:image#" class="img-thumbnail entityThumbImage" />'
                            },
                            {
                                command: [
                                    {
                                        name: "Delete",
                                        click: function (e) {
                                            var tr = $(e.target).closest("tr");
                                            var data = this.dataItem(tr);
                                            swal({
                                                title: "Sure delete ?",
                                                type: "info",
                                                showCancelButton: true,
                                                closeOnConfirm: false,
                                                showLoaderOnConfirm: true,
                                            }, function () {
                                                crud.deleteImage(data.image);
                                            });
                                        }
                                    },
                                ]
                            }
                        ]
                    });
                }
            };
            var crud = {
                readImages: function () {
                    new Ecart.Ajax.apiConnector().callservice(read, null, Ecart.Ajax.webMethod.Get).done(function (e) {
                        console.log(e);
                        $('#gvImages').data("kendoGrid").setDataSource(new kendo.data.DataSource({ data: e.data.content }));
                    });
                },
                insertImage: function (element) {
                    swal({
                        title: "Sure insert",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    }, function () {
                        var elementName = $('#' + element).val();
                        new Ecart.Ajax.apiConnector().callservice(insert, { image: $('#hndFilePath').val() }, Ecart.Ajax.webMethod.Post).done(function (e) {
                            if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                                Ecart.Animation.ajaxRequest.startWaiting(element);
                                crud.readImages();
                                messages.successAlert("success");
                            }
                            else {
                                console.error(e);
                                new Ecart.Messages.sweetAlerts().errorAlert();
                            }
                        }).always(function () {
                            Ecart.Animation.ajaxRequest.stopWaiting(element, elementName);
                        });
                    });
                },
                deleteImage: function (image) {
                    new Ecart.Ajax.apiConnector().callservice(deleted, { image: image }, Ecart.Ajax.webMethod.Post).done(function (e) {
                        if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                            crud.readImages();
                            new Ecart.Messages.sweetAlerts().successAlert();
                        }
                        else {
                            new Ecart.Messages.sweetAlerts().errorAlert();
                        }
                    });
                },
                updateOrder: function () {
                    new Ecart.Ajax.apiConnector().callservice(read, null, Ecart.Ajax.webMethod.Post).done(function (e) {
                        $('#gvImages').data("kendoGrid").setDataSource(new kendo.data.DataSource({ data: e }));
                    });
                }
            };
        })(SiteImage = AdminSite.SiteImage || (AdminSite.SiteImage = {}));
    })(AdminSite = Ecart.AdminSite || (Ecart.AdminSite = {}));
})(Ecart || (Ecart = {}));
