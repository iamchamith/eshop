var Ecart;
(function (Ecart) {
    var AdminSite;
    (function (AdminSite) {
        var SiteSettings;
        (function (SiteSettings) {
            var readSiteSettings = Ecart.Config.domains.baseUrl() + "/SiteSettings/SiteSettingsRead";
            var updateSiteSettings = Ecart.Config.domains.baseUrl() + "/SiteSettings/SiteSettingsUpdate";
            var fileUpload = Ecart.Config.domains.baseUrl() + "/Utilities/UploadFile";
            var filePath = Ecart.Config.domains.baseUrl() + "/Files/SiteLogo";
            var logout = Ecart.Config.domains.baseUrl() + "/User/LogOut";
            $(function () {
                init.initControllers();
                crud.read();
            });
            var init = {
                initControllers: function () {
                    $('#imgLogo').attr('src', filePath + "/no.jpg");
                    $("#flLogo").kendoUpload({
                        async: {
                            saveUrl: fileUpload + "?fileType=" + Number(Ecart.Enums.FileType.SiteLogo),
                            autoUpload: true
                        },
                        multiple: false,
                        success: function (e) {
                            if (e.response.responseCode == Ecart.Enums.ResponseCode.Success) {
                                $('#hndImageUrl').val(e.response.message);
                                $('#imgLogo').attr('src', e.response.content);
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
                    $('#btnSaveSettings').click(function () {
                        crud.update($(this).attr('id'), [
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
                        $('#imgLogo').attr('src', filePath + "/no.jpg");
                    });
                    $('#btnLogOut').click(function () {
                        new Ecart.Ajax.apiConnector().callservice(logout, null, Ecart.Ajax.webMethod.Get).done(function () {
                            $(location).attr('href', Ecart.Config.domains.siteUrl());
                        });
                    });
                }
            };
            var crud = {
                read: function () {
                    new Ecart.Ajax.apiConnector().callservice(readSiteSettings, null, Ecart.Ajax.webMethod.Get).done(function (e) {
                        console.log(e);
                        var obj = new siteValues();
                        $.each(e.data.content, function (i, d) {
                            if (d.globleKey == Number(Ecart.Enums.SiteVariables.Email)) {
                                obj.contactEmail = d.value;
                            }
                            else if (d.globleKey == Number(Ecart.Enums.SiteVariables.Fb)) {
                                obj.fbLink = d.value;
                            }
                            else if (d.globleKey == Number(Ecart.Enums.SiteVariables.Logo)) {
                                obj.logo = d.value;
                                $('#hndImageUrl').val(d.value);
                            }
                            else if (d.globleKey == Number(Ecart.Enums.SiteVariables.MoneyType)) {
                                obj.moneyType = d.value;
                            }
                            else if (d.globleKey == Number(Ecart.Enums.SiteVariables.PhoneNumber)) {
                                obj.phoneNumber = d.value;
                            }
                            else if (d.globleKey == Number(Ecart.Enums.SiteVariables.Seo)) {
                                obj.seo = d.value;
                            }
                            else if (d.globleKey == Number(Ecart.Enums.SiteVariables.SiteName)) {
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
                        $('#imgLogo').attr('src', filePath + "/" + obj.logo);
                        kendo.bind($("div#content"), viewModel);
                    });
                },
                update: function (element, data) {
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
                        new Ecart.Ajax.apiConnector().callservice(updateSiteSettings, data, Ecart.Ajax.webMethod.Post).done(function (e) {
                            console.log(e);
                            if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                                new Ecart.Messages.sweetAlerts().successAlert("update is success");
                            }
                            else {
                                new Ecart.Messages.sweetAlerts().errorAlert();
                            }
                        }).always(function () {
                            Ecart.Animation.ajaxRequest.stopWaiting(element, elementDefault);
                        });
                    });
                },
                uploadImage: function () { }
            };
            var siteValues = (function () {
                function siteValues() {
                }
                return siteValues;
            }());
        })(SiteSettings = AdminSite.SiteSettings || (AdminSite.SiteSettings = {}));
    })(AdminSite = Ecart.AdminSite || (Ecart.AdminSite = {}));
})(Ecart || (Ecart = {}));
//# sourceMappingURL=siteSettings.js.map