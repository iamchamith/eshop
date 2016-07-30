module Ecart.AdminSite.SiteImage {

    const read = Ecart.Config.domains.baseUrl() + "/SiteSettings/ImageSliderReadImage";
    const insert = Ecart.Config.domains.baseUrl() + "/SiteSettings/ImageSliderInsertImage";
    const deleted = Ecart.Config.domains.baseUrl() + "/SiteSettings/ImageSliderDeleteImage";
    const changeOrder = Ecart.Config.domains.baseUrl() + "/SiteSettings/ImageSliderChangeOrder";
    const messages = new Ecart.Messages.sweetAlerts();
    const fileUpload = Ecart.Config.domains.baseUrl() + "/Utilities/UploadFile";
    const filePath = Ecart.Config.domains.baseUrl() + "/Files/ImageSlider";

    $(function () {

        init.initControllers();
        crud.readImages();

    });


    var init = {

        initControllers: function () {

            $('#imgSlider').attr('scr', filePath+"/no.jpg");

            $("#flImage").kendoUpload({
                async: {
                    saveUrl: fileUpload + "?fileType=" + Number(Enums.FileType.ImageSlider),
                    autoUpload: true
                },
                multiple: false,
                success: function (e) {
                    if (e.response.responseCode == Enums.ResponseCode.Success) {
                        $('#imgSlider').attr('src', e.response.content);
                        $('#hndFilePath').val(e.response.message);
                    } else if (e.response.responseCode == Enums.ResponseCode.ValidationError) {
                        alert('validation error');
                    } else {
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

            $('#gvImages').data("kendoGrid").table.kendoSortable({
                filter: ">tbody >tr",
                hint: $.noop,
                cursor: "move",
                placeholder: function (element) {
                    return element.clone().addClass("k-state-hover").css("opacity", 0.65);
                },
                container: "#gvImages tbody",
                change: function (e) {

                }
            });


            $('#btnSliderOrdering').click(function () {

                $.each($('#gvImages').data("kendoGrid").table.data('kendoSortable').items(), function (i, d) {

                    var x  = $('#gvImages').data("kendoGrid").table.data('kendoSortable').element[0].innerHTML

                })
              
            });
        }


      

    }

    var crud = {

        readImages: function () {

            new Ecart.Ajax.apiConnector().callservice(read, null, Ajax.webMethod.Get).done(function (e) {
                console.log(e);
                $('#gvImages').data("kendoGrid").setDataSource(new kendo.data.DataSource({ data: e.data.content }));
            });
            
        },
        insertImage: function (element: any): void {

            swal({
                title: "Sure insert",
                type: "info",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
            }, function () {
                var elementName = $('#' + element).val();

                new Ecart.Ajax.apiConnector().callservice(insert, { image: $('#hndFilePath').val() }, Ajax.webMethod.Post).done(function (e) {
                    if (e.data.responseCode == Number(Enums.ResponseCode.Success)) {
                        Ecart.Animation.ajaxRequest.startWaiting(element);
                        crud.readImages();
                        messages.successAlert("success");
                    } else {
                        console.error(e);
                        new Ecart.Messages.sweetAlerts().errorAlert();
                    }
                }).always(function () {
                    Ecart.Animation.ajaxRequest.stopWaiting(element, elementName);
                });
           }); 
        },
        deleteImage: function (image: string): void {
            new Ecart.Ajax.apiConnector().callservice(deleted, { image: image }, Ajax.webMethod.Post).done(function (e) {
                if (e.data.responseCode == Number(Enums.ResponseCode.Success)) {
                    crud.readImages();
                    new Ecart.Messages.sweetAlerts().successAlert();
                } else {
                    new Ecart.Messages.sweetAlerts().errorAlert();
                }
            });
        },
        updateOrder: function () {
            new Ecart.Ajax.apiConnector().callservice(read, null, Ajax.webMethod.Post).done(function (e) {
                $('#gvImages').data("kendoGrid").setDataSource(new kendo.data.DataSource({ data: e }));
            });
        }
    }
}