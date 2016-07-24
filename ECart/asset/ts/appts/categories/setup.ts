module Ecart.Brands.View {

    const baseApi = Ecart.Config.domains.baseUrl();
    const baseSite = "";
    const prefix = baseApi + "/Categories";
    const read = prefix + "/ReadCategories";
    const ReadCategoryById = prefix +"/ReadCategoryById"
    const update = prefix + "/UpdateCategories";
    const deleted = prefix + "/DeleteCategory";
    const create = prefix + "/InsertCategory";
    const fileUpload = baseApi + "/Utilities/UploadFile";
    const readCategoryList = prefix + "/ReadCategoryList";
    const filePath = Ecart.Config.domains.baseUrl() + "/Files/Categories/";
    const messages = new Ecart.Messages.sweetAlerts();
    const view = '~/admin/Categories';
    $(function () {

        init.initControlles();
        crud.readList();

        const mode = Number(new Ecart.Utility.url().getParameterByName("mode", window.location.href));
        $('#hndMode').val(mode);
        if (mode == Number(Ecart.Enums.CrudType.Update)) {
            $('.btnDel').removeClass('hidden');
            var catId = new Ecart.Utility.url().getParameterByName("id", window.location.href);
            $('#hndCategoryId').val(catId);
            crud.read(catId, $(this).attr('id'));
        }
    });

    var init= {
        initControlles: function () {
            $("#txtDiscription").kendoEditor({
                resizable: {
                    content: true,
                    toolbar: true
                }
            });
            $("#ddCategoryParent").kendoComboBox({
                dataValueField: "value",
                dataTextField : "text"
            });


            $("#imgFile").kendoUpload({
                async: {
                    saveUrl: fileUpload + "?fileType=" + Number(Enums.FileType.Categories),
                    autoUpload: true
                },
                multiple: false,
                success: function (e) {
                    if (e.response.responseCode == Enums.ResponseCode.Success) {
                        $('#imgCaregoryImage').attr('src', e.response.content);
                        $('#hndFilePath').val(e.response.message);
                    } else if (e.response.responseCode == Enums.ResponseCode.ValidationError) {
                        alert('validation error');
                    } else {
                        new Ecart.Messages.sweetAlerts().errorAlert("error");
                        console.error(e.response);
                    }
                }
            });

            $('#btnCategoriesSave').click(function () {
 
                if (Number($('#hndMode').val()) == Number(Enums.CrudType.Insert)) {
                    crud.create($(this).attr('id'));
                } else {
                    crud.update($(this).attr('id'));
                }
            });
            $('#btnCategoriesDelete').click(function () {

                crud.delete($(this).val());
            });
        }
    }

    var crud = {

        readList: function () {
            new Ecart.Ajax.apiConnector().callservice(readCategoryList, {}, Ajax.webMethod.Get).done(
                function (e) {
                    if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                        $("#ddCategoryParent").data("kendoComboBox").setDataSource(new kendo.data.DataSource({ data: e.data.content }));
                        $("#ddCategoryParent").data("kendoComboBox").select(0);
                    } else {
                        console.error(e);
                        messages.errorAlert();
                    }
                }
            ); 

        },
        read: function (id: string,element:any): any {
            new Ecart.Ajax.apiConnector().callservice(ReadCategoryById, { id: id }, Ajax.webMethod.Get).done(
                function (e) {
                    console.log(e);
                    $("#txtCategoryName").val(e.data.content.name);
                    $("#txtDiscription").data("kendoEditor").value(e.data.content.discription);
                    $('#txtSeo').val(e.data.content.seo);
                    $('#hndFilePath').val(e.data.content.image);
                    $("#ddCategoryParent").data("kendoComboBox").value(e.data.content.parent);
                    if (e.data.content.Enable){
                        $("#isCategoryEnable").prop('checked', true);
                    }
                    if (e.data.content.image == null) {
                        e.data.content.image = "no.jpg";
                    }
                    $('#imgCaregoryImage').attr('src', filePath+e.data.content.image);
                }
            ).always(
                function () {

                }
         )},
        update: function (element: any): any {

            var elementName = $('#' + element).val();
          
            swal({
                title: "Sure insert ?",
                text: "",
                type: "info",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
            }, function () {
             Ecart.Animation.ajaxRequest.startWaiting(element);
            new Ecart.Ajax.apiConnector().callservice(update, {
                Category_Id: $('#hndCategoryId').val(),
                Name: $("#txtCategoryName").val(),
                Discription: $("#txtDiscription").data("kendoEditor").value(),
                Seo: $("#txtSeo").val(),
                Image: $('#hndFilePath').val(),
                Parent: $("#ddCategoryParent").data("kendoComboBox").value(),
                Enable: $("#isCategoryEnable").is(':checked')
            }, Ajax.webMethod.Post).done(
                function (e) {
                    if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                        messages.successAlert("category creation is success");
                    }
                    else if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.ValidationError)) {
                        messages.errorAlert("not success");
                    }
                    else {
                        console.error(e);
                        messages.errorAlert();
                    }
                }
            ).always(
                function () {
                    Ecart.Animation.ajaxRequest.stopWaiting(element, elementName);

                }
                );
             });
        },
        delete: function (element:any):void {

            var elementName = $('#' + element).val();

            swal({
                title: "Sure delete ?",
                text: "",
                type: "info",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
            }, function () {
                Ecart.Animation.ajaxRequest.startWaiting(element);
                new Ecart.Ajax.apiConnector().callservice(deleted, {
                    categoryId: $('#hndCategoryId').val()
                   
                }, Ajax.webMethod.Post).done(
                    function (e) {
                        if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                            messages.successAlert("category delete is success");
                        }
                        else if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.ValidationError)) {
                            messages.errorAlert("not success");
                            $(location).attr('href', view);
                        }
                        else {
                            console.error(e);
                            messages.errorAlert();
                        }
                    }).always(
                    function () {
                        Ecart.Animation.ajaxRequest.stopWaiting(element, elementName);
                    });
                });
        },
        create: function (element: any): void {

            var elementName = $('#' + element).val();
            Ecart.Animation.ajaxRequest.startWaiting(element);

            swal({
                title: "Sure insert",
                text: "",
                type: "info",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
            }, function () {
                new Ecart.Ajax.apiConnector().callservice(create, {
                    Name: $("#txtCategoryName").val(),
                    Discription: $("#txtDiscription").data("kendoEditor").value(),
                    Seo: $('#txtSeo').val(),
                    Image: $('#hndFilePath').val(),
                    Parent: $("#ddCategoryParent").data("kendoComboBox").value(),
                    Enable: $("#isCategoryEnable").is(':checked')
                }, Ajax.webMethod.Post).done(
                    function (e) {
                        if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                            messages.successAlert("category creation is success");
                        }
                        else if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.ValidationError)) {
                            messages.errorAlert("not success");
                        }
                        else {
                            console.error(e);
                            messages.errorAlert();
                        }
                    }
                    ).always(
                    function () {
                        Ecart.Animation.ajaxRequest.stopWaiting(element, elementName);

                    }
              );
            });

            
        },

        clear: function () {

        }

    }
}

/*
    public string Category_Id { get; set; }
        public string DomainId { get; set; }
        public string Name { get; set; }
        public string Discription { get; set; }
        public string Seo { get; set; }
        public string Image { get; set; }
        public string Parent { get; set; }
        public bool? Enable { get; set; }
*/