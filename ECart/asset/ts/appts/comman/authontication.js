/// <reference path="../comman/ajax.ts" />
var Ecart;
(function (Ecart) {
    var Auth;
    (function (Auth) {
        var base = "";
        var login = base + "";
        var register = base + "";
        var emailValidation = base + "";
        var changePassword = base + "";
        var UpdateUser = base + "";
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
            login: function () {
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
//# sourceMappingURL=authontication.js.map