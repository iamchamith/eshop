/// <reference path="../comman/ajax.ts" />
module Ecart.Auth {

    const base = "";
    const login = base + "";
    const register = base + "";
    const emailValidation = base + "";
    const changePassword = base + "";
    const UpdateUser = base + "";

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
            $("#template_content").html( $("#template_login").html());
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
    }

    var auth = {

        register: function (url, data) {

            new Ecart.Ajax.apiConnector().callservice(url, data, Ajax.webMethod.Post).done(function (e) {


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
    }
}