module Ecart.User.TokenProcess {
    const Home = "/Admin/Dashboard";
    const ChangePasswordToNew = "";
    const ValidateToken = Ecart.Config.domains.baseUrl() + "/User/TokenValidate";
    $(function () {

        var obj = JSON.parse(Ecart.Utility.cookies.readCookie(Ecart.Config.cookies.userCookie));
        $('#lblName').html(obj.name);
        $('#btnSendTokenRequest').click(function () {
            crud.sendTokenRequest();
        });

    });

    var crud = {
        sendTokenRequest: function () {
            new Ecart.Ajax.apiConnector().callservice(ValidateToken, {
                type: $('#hndTokenType').val(),
                token: $('#txtToken').val(),
                email: $('#hndEmail').val()
            }, Ajax.webMethod.Post).done(function (e) {
                console.log(e);
                if (e.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                    $(location).attr("href", Home);
                } else {
                    new Ecart.Messages.sweetAlerts().errorAlert("invalied token");
                }
            });
        }
    };
}