/// <reference path="../comman/ajax.ts" />
module Ecart.Auth {

    const baseApi = $('#hndBaseUrl').val();
    const login = baseApi + "/User/Authonticate";
    const register = baseApi + "/User/Register";
    const emailValidation = baseApi + "";
    const changePassword = baseApi + "";
    const UpdateUser = baseApi;
    const Home = "/Admin/Dashboard"

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
            }, Ajax.webMethod.Post).done(function (e) {
                console.log(e);
                if (Number(e.data) == Number(Enums.AuthType.NotValidateEmail)) {
                    $(location).attr("href", '/UserAuth/Verification');
                } else {
                    new Ecart.Messages.sweetAlerts().errorAlert();
                }
            });
        },
        login: function (url: string, data: any): any {
            new Ecart.Ajax.apiConnector().callservice(url, data, Ajax.webMethod.Post).done(function (e) {
                 
                if (Number(e.data) == Number(Enums.AuthType.NotValidateEmail)) {
                    $(location).attr("href", '/UserAuth/Verification');
                } else if (Number(e.data) == Number(Enums.AuthType.ValidateEmail)) {
                    $(location).attr("href", Home);
                } else if (Number(e.data) == Number(Enums.AuthType.ValidationError))
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
    }
}