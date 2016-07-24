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
            $(function () {
                crud.read();
                $('#btnChangePassword').on("click", crud.changePassword);
                $('#btnChangeUserDetails').click(function () {
                    crud.updateUserSettings($('#txtDisplayName').val());
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
                    });
                },
                updateUserSettings: function (displayName) {
                    new Ecart.Ajax.apiConnector().callservice(updateUserSettings, { displayName: $('#txtDisplayName').val() }, Ecart.Ajax.webMethod.Post).done(function (e) {
                        console.log(e);
                    });
                },
                updateDomain: function () {
                },
                changePassword: function () {
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
                            if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.ValidationError)) {
                                new Ecart.Messages.sweetAlerts().errorAlert("current password is invalied");
                            }
                            else if (e.data.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                                new Ecart.Messages.sweetAlerts().successAlert("change password is success");
                            }
                            else {
                                new Ecart.Messages.sweetAlerts().errorAlert();
                                console.error(e);
                            }
                        });
                    });
                }
            };
        })(ProcessUser = User.ProcessUser || (User.ProcessUser = {}));
    })(User = Ecart.User || (Ecart.User = {}));
})(Ecart || (Ecart = {}));
