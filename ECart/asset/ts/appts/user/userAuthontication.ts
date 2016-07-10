/// <reference path="../comman/ajax.ts" />
module Ecart.Auth {

    const baseApi = $('#hndBaseUrl').val();
    const login = baseApi + "/User/Authonticate";
    const register = baseApi + "";
    const emailValidation = baseApi + "";
    const changePassword = baseApi + "";
    const UpdateUser = baseApi;
    const Home = "/Admin/Dashboard"
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
            $("#template_content").html(kendo.template($("#template_login").html()));
        },
        register: function () {
            $('#lblTitile').val('Sign Up free');
            $("#template_content").html(kendo.template($("#template_register").html()));
        },
        forgetPassword: function () {
            $('#lblTitile').val('Forget password');
            $("#template_content").html(kendo.template($("#template_forgetPasswordRequest").html()));
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
        login: function (url: string, data: any): any {
            new Ecart.Ajax.apiConnector().callservice(url, data, Ajax.webMethod.Post).done(function (e) {

                console.error(e);
                if (e.data.responseCode == Ecart.Enums.ResponseCode.Success) {
                    $(location).attr('href', Home);
                } else if (e.data.responseCode == Ecart.Enums.ResponseCode.ValidationError) {
                    alert('invalied username or password');
                } else {
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
    }
}