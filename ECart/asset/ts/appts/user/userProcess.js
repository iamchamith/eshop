var Ecart;
(function (Ecart) {
    var User;
    (function (User) {
        var ProcessUser;
        (function (ProcessUser) {
            var baseApi = Ecart.Config.domains.baseUrl();
            var readUserInfo = baseApi + "/User/GetUserInfo";
            var changePassword = baseApi + "/User/ChangePassword";
            var updateUserSettings = baseApi + "/User/UpdateUserDetails";
            var updateDomain = baseApi + '/User/UpdateDomain';
            $(function () {
                crud.read();
                $('#btnChangePassword').click(function () {
                    crud.changePassword($(this).attr('id'));
                });
                $('#btnChangeUserDetails').click(function () {
                    crud.updateUserSettings($(this).attr("id"), $('#txtDisplayName').val());
                });
                $('#btnUpdateDomain').click(function () {
                    crud.updateDomain($(this).val());
                });
            });
            var crud = {
                read: function () {
                    new Ecart.Ajax.apiConnector().callservice(readUserInfo, null, Ecart.Ajax.webMethod.Get).done(function (e) {
                        console.log(e);
                        if (e.data.user.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                            $('#txtDomain').val(e.data.domain);
                            $('#txtEmail').val(e.data.user.content.email);
                            $('#txtDisplayName').val(e.data.user.content.name);
                            $('#txtRegDate').val(e.data.user.content.createdDate);
                        }
                        else {
                            new Ecart.Messages.sweetAlerts().errorAlert();
                        }
                    });
                },
                updateUserSettings: function (element, displayName) {
                    var elementVal = $('#' + element).val();
                    swal({
                        title: "sure change info ?",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    }, function () {
                        Ecart.Animation.ajaxRequest.startWaiting(element);
                        new Ecart.Ajax.apiConnector().callservice(updateUserSettings, { displayName: $('#txtDisplayName').val() }, Ecart.Ajax.webMethod.Post).done(function (e) {
                            if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                                new Ecart.Messages.sweetAlerts().successAlert("update infomation is success");
                            }
                            else if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.ValidationError)) {
                                new Ecart.Messages.sweetAlerts().errorAlert("validation error", "name must reqred");
                            }
                            else {
                                new Ecart.Messages.sweetAlerts().errorAlert();
                            }
                        }).always(function () {
                            Ecart.Animation.ajaxRequest.stopWaiting(element, elementVal);
                        });
                    });
                },
                updateDomain: function (element) {
                    var elementVal = $('#' + element).val();
                    swal({
                        title: "Sure Change password ?",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    }, function () {
                        Ecart.Animation.ajaxRequest.startWaiting(element);
                        new Ecart.Ajax.apiConnector().callservice('', { domain: $('#updateDomain').val() }, Ecart.Ajax.webMethod.Post).done(function (e) {
                            if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                                new Ecart.Messages.sweetAlerts().successAlert("domain change is success");
                            }
                            else if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.ValidationError)) {
                                new Ecart.Messages.sweetAlerts().successAlert("invalied domain.try another one");
                            }
                            else {
                                console.error(e);
                                new Ecart.Messages.sweetAlerts().errorAlert();
                            }
                        }).always(function () {
                            Ecart.Animation.ajaxRequest.stopWaiting(element, elementVal);
                        });
                    });
                },
                changePassword: function (element) {
                    var elementVal = $('#' + element).val();
                    swal({
                        title: "Sure Change password ?",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    }, function () {
                        new Ecart.Ajax.apiConnector().callservice(changePassword, {
                            ConfirmNewPassword: $('#txtConfirmNewPassword').val(),
                            NewPassword: $('#txtNewPassword').val(),
                            Password: $('#txtCurrentPassword').val()
                        }, Ecart.Ajax.webMethod.Post).done(function (e) {
                            Ecart.Animation.ajaxRequest.startWaiting(element);
                            if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.ValidationError)) {
                                new Ecart.Messages.sweetAlerts().errorAlert("current password is invalied");
                            }
                            else if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                                new Ecart.Messages.sweetAlerts().successAlert("change password is success");
                                //clear informations
                                $('#txtConfirmNewPassword').val('');
                                $('#txtNewPassword').val('');
                                $('#txtCurrentPassword').val('');
                            }
                            else {
                                new Ecart.Messages.sweetAlerts().errorAlert();
                                console.error(e);
                            }
                        }).always(function () {
                            Ecart.Animation.ajaxRequest.stopWaiting(element, elementVal);
                        });
                    });
                }
            };
        })(ProcessUser = User.ProcessUser || (User.ProcessUser = {}));
    })(User = Ecart.User || (Ecart.User = {}));
})(Ecart || (Ecart = {}));
//# sourceMappingURL=userProcess.js.map