/// <reference path="../comman/ajax.ts" />
var Ecart;
(function (Ecart) {
    var Auth;
    (function (Auth) {
        var baseApi = $('#hndBaseUrl').val();
        var login = baseApi + "/User/Authonticate";
        var register = baseApi + "/User/Register";
        var emailValidation = baseApi + "";
        var changePassword = baseApi + "";
        var UpdateUser = baseApi;
        var Home = "/Admin/Dashboard";
        $(function () {
            $('#btnRegister').on('click', function () {
                auth.register();
            });
            $('#btnLogin').on('click', function () {
                auth.login(login, {
                    Email: $('#txtLoginEmail').val(),
                    Password: $('#txtLogginPassword').val()
                });
            });
        });
        var auth = {
            register: function () {
                new Ecart.Ajax.apiConnector().callservice(register, {
                    Email: $('#txtEmail').val(),
                    Password: $('#txtPassword').val(),
                    ConfirmNewPassword: $('#txtConfrimPassword').val(),
                    Domain: $('#txtDomain').val(),
                    Name: $('#txtDiaplayName').val()
                }, Ecart.Ajax.webMethod.Post).done(function (e) {
                    console.log(e);
                    if (Number(e.data) == Number(Ecart.Enums.AuthType.NotValidateEmail)) {
                        $(location).attr("href", '/UserAuth/Verification');
                    }
                    else {
                        new Ecart.Messages.sweetAlerts().errorAlert();
                    }
                });
            },
            login: function (url, data) {
                new Ecart.Ajax.apiConnector().callservice(url, data, Ecart.Ajax.webMethod.Post).done(function (e) {
                    if (Number(e.data) == Number(Ecart.Enums.AuthType.NotValidateEmail)) {
                        $(location).attr("href", '/UserAuth/Verification');
                    }
                    else if (Number(e.data) == Number(Ecart.Enums.AuthType.ValidateEmail)) {
                        $(location).attr("href", Home);
                    }
                    else if (Number(e.data) == Number(Ecart.Enums.AuthType.ValidationError))
                        new Ecart.Messages.sweetAlerts().errorAlert("invalied username or password");
                    else {
                        new Ecart.Messages.sweetAlerts().errorAlert();
                        console.error(e);
                    }
                });
            },
            emailValidate: function () {
            },
        };
        var changeSettions = {
            updateUser: function () { },
            changePassword: function () { },
        };
    })(Auth = Ecart.Auth || (Ecart.Auth = {}));
})(Ecart || (Ecart = {}));
