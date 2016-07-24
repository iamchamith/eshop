module Ecart.Config.SiteVariables {

    $(function () {

        init.initVariablesAdmin();

        $('#btnLogOut').click(function () {
            new Ecart.Ajax.apiConnector().callservice(Ecart.Config.domains.baseUrl + "/User/LogOut", null, Ajax.webMethod.Get).done(function () {
                Utility.cookies.eraseCookie(Ecart.Config.cookies.userCookie);
                $(location).attr('href','~/UserAuth/index');
            });
        });
    })

    var init = {
        initVariablesAdmin: function () {
             
            var variables = {
                siteName: Ecart.Config.domains.siteName(),
                displayName: JSON.parse(Ecart.Utility.cookies.readCookie(Ecart.Config.cookies.userCookie)).name
            };

            kendo.bind($("div#wrapper"), kendo.observable(variables));
        }
    }
}