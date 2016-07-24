module Ecart.AdminSite.SiteSettings {

    const readSiteSettings = Ecart.Config.domains.baseUrl() + "/SiteSettings/SiteSettingsRead";
    const updateSiteSettings = Ecart.Config.domains.baseUrl() + "/SiteSettings/SiteSettingsUpdate";
    const fileUpload = Ecart.Config.domains.baseUrl() + "/Utilities/UploadFile";
    const filePath = Ecart.Config.domains.baseUrl() + "/Files/SiteLogo";
    const logout = Ecart.Config.domains.baseUrl() +"/User/LogOut";
    $(function () {
        init.initControllers();
        crud.read();
    });
 
    var init = {
        initControllers: function () {
            $("#flLogo").kendoUpload({
                async: {
                    saveUrl: fileUpload + "?fileType=" + Number(Enums.FileType.SiteLogo),
                    autoUpload: true
                },
                multiple: false,
                success: function (e) {
                    if (e.response.responseCode == Enums.ResponseCode.Success) {
                        $('#hndImageUrl').val(e.response.message);
                        $('#imgLogo').attr('src', e.response.content);
                    } else if (e.response.responseCode == Enums.ResponseCode.ValidationError) {
                        alert('validation error');
                    } else {
                        new Ecart.Messages.sweetAlerts().errorAlert("error");
                        console.error(e.response);
                    }
                }
            });
            $('#btnSaveSettings').click(function () {
                crud.update($(this).attr('id'),
                    [
                        { GlobleKey: Number(Ecart.Enums.SiteVariables.Email), Value: $('#txtContactEmails').val() },
                        { GlobleKey: Number(Ecart.Enums.SiteVariables.SiteName), Value: $('#txtSiteName').val() },
                        { GlobleKey: Number(Ecart.Enums.SiteVariables.MoneyType), Value: $('#txtMoneyType').val() },
                        { GlobleKey: Number(Ecart.Enums.SiteVariables.PhoneNumber), Value: $('#txtPhoneNumber').val() },
                        { GlobleKey: Number(Ecart.Enums.SiteVariables.Fb), Value: $('#txtFbLink').val() },
                        { GlobleKey: Number(Ecart.Enums.SiteVariables.Seo), Value: $('#txtSeo').val() },
                        { GlobleKey: Number(Ecart.Enums.SiteVariables.Logo), Value: $('#hndImageUrl').val() }
                    ]);
            });

            $(window).error(function () {
                $('#imgLogo').attr('src', filePath+ "/no.jpg");
            });

            $('#btnLogOut').click(function () {
                new Ecart.Ajax.apiConnector().callservice(logout, null, Ajax.webMethod.Get).done(function () {
                    $(location).attr('href', Ecart.Config.domains.siteUrl());
                });
            });
        }
     
    }

    var crud = {
        read: function (): void {
            new Ecart.Ajax.apiConnector().callservice(readSiteSettings, null, Ajax.webMethod.Get).done(function (e) {

                console.log(e);
                var obj = new siteValues();
                
                $.each(e.data.content, function (i, d) {

                    if (d.globleKey == Number(Enums.SiteVariables.Email)) {
                        obj.contactEmail = d.value;
                    } else if (d.globleKey == Number(Enums.SiteVariables.Fb)) {
                        obj.fbLink = d.value;
                    }
                    else if (d.globleKey == Number(Enums.SiteVariables.Logo)) {
                        obj.logo = d.value;
                        $('#hndImageUrl').val(d.value);
                    } else if (d.globleKey == Number(Enums.SiteVariables.MoneyType)) {
                        obj.moneyType = d.value;
                    } else if (d.globleKey == Number(Enums.SiteVariables.PhoneNumber)) {
                        obj.phoneNumber = d.value;
                    } else if (d.globleKey == Number(Enums.SiteVariables.Seo)) {
                        obj.seo = d.value;
                    } else if (d.globleKey == Number(Enums.SiteVariables.SiteName)) {
                        obj.siteName = d.value;
                    } 

                });

                var viewModel = kendo.observable({
                    siteName: obj.siteName,
                    contactEmail: obj.contactEmail,
                    moneyType: obj.moneyType,
                    phoneNumber: obj.phoneNumber,
                    fbLink: obj.fbLink,
                    seo: obj.seo
                }); 
                $('#imgLogo').attr('src', filePath + "/"+obj.logo);
                kendo.bind($("div#content"), viewModel);

            });
        },
        update: function (element: string, data: any): void{

            swal({
                title: "do you want to update site settings ?",
                text: "",
                type: "info",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
            }, function () {

                var elementDefault = $('#' + element).val();
                Ecart.Animation.ajaxRequest.startWaiting(element);

                new Ecart.Ajax.apiConnector().callservice(updateSiteSettings, data, Ajax.webMethod.Post).done(function (e) {
                    console.log(e);
                    if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                        new Ecart.Messages.sweetAlerts().successAlert("update is success");
                    } else {
                        new Ecart.Messages.sweetAlerts().errorAlert();
                    }

                }).always(function () {
                    Ecart.Animation.ajaxRequest.stopWaiting(element, elementDefault);
                });
            });

           
        },
        uploadImage: function (): void { }
    };

    class siteValues {
        siteName: string;
        contactEmail: string;
        moneyType: string;
        phoneNumber: string;
        fbLink: string;
        logo: string;
        seo: string;
    }
}