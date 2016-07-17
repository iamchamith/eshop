/// <reference path="../comman/ajax.ts" />
module Ecart.Auth {

    const baseApi = Ecart.Config.domains.baseUrl();
    const login = baseApi + "/User/Authonticate";
    const register = baseApi + "/User/Register";
    const changePassword = baseApi + "";
    const UpdateUser = baseApi;
    const Home = "/Admin/Dashboard"

    $(function () {
  
        $('#btnRegister').on('click', function () {
            auth.register($(this).attr('id'));
        });

        $('#btnLogin').on('click', function () {
            auth.login(login, {
                Email: $('#txtLoginEmail').val(),
                Password: $('#txtLogginPassword').val()
            },$(this).attr('id'));
        });
       
    });
 
    var auth = {
        register: function (element: any) {

            var elementDefault = $('#' + element).val();
            Ecart.Animation.ajaxRequest.startWaiting(element);
            new Ecart.Ajax.apiConnector().callservice(register, {
                Email: $('#txtEmail').val(),
                Password: $('#txtPassword').val(),
                ConfirmNewPassword: $('#txtConfrimPassword').val(),
                Domain: $('#txtDomain').val(),
                Name: $('#txtDiaplayName').val()
            }, Ajax.webMethod.Post).done(function (e) {
                console.log(e);
                if (e.responseCode == Number(Ecart.Enums.ResponseCode.ValidationError)) {
                    new Ecart.Messages.sweetAlerts().validationError(e.message, e.content);
                } else if (e.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                    Ecart.Utility.cookies.createCookie(Ecart.Config.cookies.userCookie, JSON.stringify(e.content));
                    $(location).attr("href", '/UserAuth/Verification?val=0');
                } else {
                    new Ecart.Messages.sweetAlerts().errorAlert();
                }
                }).always(function () {
                    Ecart.Animation.ajaxRequest.stopWaiting(element, elementDefault);
                });

        },
        login: function (url: string, data: any,element:string): any {
            var elementDefault = $('#' + element).val();
            Ecart.Animation.ajaxRequest.startWaiting(element);
            new Ecart.Ajax.apiConnector().callservice(url, data, Ajax.webMethod.Post).done(function (e) {
                if (e.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                    Ecart.Utility.cookies.createCookie(Ecart.Config.cookies.userCookie, JSON.stringify(e.content));
                    if (e.content.emailConfirmed) {
                        $(location).attr('href', Home);
                    } else {
                        $(location).attr("href", '/UserAuth/Verification?val=0');
                    }
                } else {
                    new Ecart.Messages.sweetAlerts().errorAlert("invalied username or password");
                }
            }).always(function () {
                Ecart.Animation.ajaxRequest.stopWaiting(element, elementDefault);
            });;
        },
    };

}