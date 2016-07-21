/// <reference path="../comman/ajax.ts" />
var Ecart;
(function (Ecart) {
    var Auth;
    (function (Auth) {
        var baseApi = Ecart.Config.domains.baseUrl();
        var login = baseApi + "/User/Authonticate";
        var register = baseApi + "/User/Register";
        var changePassword = baseApi + "";
        var UpdateUser = baseApi;
        var Home = "/Admin/Dashboard";
        var forgetPassword = baseApi + "/User/ForgetPasswordRequest";
        $(function () {
            $('#btnRegister').on('click', function () {
                auth.register($(this).attr('id'));
            });
            $('#btnLogin').on('click', function () {
                auth.login(login, {
                    Email: $('#txtLoginEmail').val(),
                    Password: $('#txtLogginPassword').val()
                }, $(this).attr('id'));
            });
            $('#btnForgetPasswordSendRequest').on('click', function () {
                auth.forgetPasswordRequest($(this).attr('id'), $('#txtForgetPasswordSendRequest').val());
            });
        });
        var auth = {
            register: function (element) {
                var elementDefault = $('#' + element).val();
                Ecart.Animation.ajaxRequest.startWaiting(element);
                new Ecart.Ajax.apiConnector().callservice(register, {
                    Email: $('#txtEmail').val(),
                    Password: $('#txtPassword').val(),
                    ConfirmNewPassword: $('#txtConfrimPassword').val(),
                    Domain: $('#txtDomain').val(),
                    Name: $('#txtDiaplayName').val()
                }, Ecart.Ajax.webMethod.Post).done(function (e) {
                    console.log(e);
                    if (e.responseCode == Number(Ecart.Enums.ResponseCode.ValidationError)) {
                        new Ecart.Messages.sweetAlerts().validationError(e.message, e.content);
                    }
                    else if (e.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                        Ecart.Utility.cookies.createCookie(Ecart.Config.cookies.userCookie, JSON.stringify(e.content));
                        $(location).attr("href", '/UserAuth/Verification?val=0');
                    }
                    else {
                        new Ecart.Messages.sweetAlerts().errorAlert();
                    }
                }).always(function () {
                    Ecart.Animation.ajaxRequest.stopWaiting(element, elementDefault);
                });
            },
            login: function (url, data, element) {
                var elementDefault = $('#' + element).val();
                Ecart.Animation.ajaxRequest.startWaiting(element);
                new Ecart.Ajax.apiConnector().callservice(url, data, Ecart.Ajax.webMethod.Post).done(function (e) {
                    if (e.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                        Ecart.Utility.cookies.createCookie(Ecart.Config.cookies.userCookie, JSON.stringify(e.content));
                        if (e.content.emailConfirmed) {
                            $(location).attr('href', Home);
                        }
                        else {
                            $(location).attr("href", '/UserAuth/Verification?val=0');
                        }
                    }
                    else {
                        new Ecart.Messages.sweetAlerts().errorAlert("invalied username or password");
                    }
                }).always(function () {
                    Ecart.Animation.ajaxRequest.stopWaiting(element, elementDefault);
                });
            },
            forgetPasswordRequest: function (element, email) {
                var elementDefault = $('#' + element).val();
                Ecart.Animation.ajaxRequest.startWaiting(element);
                new Ecart.Ajax.apiConnector().callservice(forgetPassword, { email: email }, Ecart.Ajax.webMethod.Post).done(function (e) {
                    if (e.responseCode == Number(Ecart.Enums.ResponseCode.ValidationError)) {
                        new Ecart.Messages.sweetAlerts().errorAlert("invalied email address");
                    }
                    else if (e.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                        $(location).attr("href", '/UserAuth/Verification?val=1&email=' + email + '');
                    }
                    else {
                        console.error(e);
                    }
                    console.log(e);
                }).always(function () {
                    Ecart.Animation.ajaxRequest.stopWaiting(element, elementDefault);
                });
            },
        };
    })(Auth = Ecart.Auth || (Ecart.Auth = {}));
})(Ecart || (Ecart = {}));
