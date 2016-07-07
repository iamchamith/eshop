/// <reference path="../comman/ajax.ts" />
var Ecart;
(function (Ecart) {
    var Auth;
    (function (Auth) {
        var baseApi = $('#hndBaseUrl').val();
        var login = baseApi + "/User/Authonticate";
        var register = baseApi + "";
        var emailValidation = baseApi + "";
        var changePassword = baseApi + "";
        var UpdateUser = baseApi;
        var Home = "/Admin/Dashboard";
        $(function () {
            view.login();
            $('#btnLinkRegister').click(function () {
                view.register();
            });
            $('.linkToLogin').click(function () {
                view.login();
            });
            $('.linkToLogin').click(function () {
                view.login();
            });
            $('#btnLinkForgetPassword').click(function () {
                view.forgetPassword();
            });
            $('#btnRegister').on('click', function () {
                alert();
            });
            $('#btnLogin').on('click', function () {
                auth.login(login, {
                    Email: $('#txtLoginEmail').val(),
                    Password: $('#txtLogginPassword').val()
                });
            });
        });
        var view = {
            login: function () {
                $('#lblTitile').val('Please Sign In');
                $("#template_content").html($("#template_login").html());
            },
            register: function () {
                $('#lblTitile').val('Sign Up free');
                $("#template_content").html($("#template_register").html());
            },
            forgetPassword: function () {
                $('#lblTitile').val('Forget password');
                $("#template_content").html($("#template_forgetPasswordRequest").html());
            },
            checkToken: function () {
            },
            newPassword: function () {
            }
        };
        var auth = {
            register: function (url, data) {
                new Ecart.Ajax.apiConnector().callservice(url, data, Ecart.Ajax.webMethod.Post).done(function (e) {
                });
            },
            login: function (url, data) {
                new Ecart.Ajax.apiConnector().callservice(url, data, Ecart.Ajax.webMethod.Post).done(function (e) {
                    console.error(e);
                    if (e.data.responseCode == Ecart.Enums.ResponseCode.Success) {
                        $(location).attr('href', Home);
                    }
                    else if (e.data.responseCode == Ecart.Enums.ResponseCode.ValidationError) {
                        alert('invalied username or password');
                    }
                    else {
                        console.error(e);
                    }
                });
            },
            emailValidate: function () {
            }
        };
        var changeSettions = {
            updateUser: function () { },
            changePassword: function () { },
        };
    })(Auth = Ecart.Auth || (Ecart.Auth = {}));
})(Ecart || (Ecart = {}));
