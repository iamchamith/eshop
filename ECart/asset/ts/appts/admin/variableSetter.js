var Ecart;
(function (Ecart) {
    var Config;
    (function (Config) {
        var SiteVariables;
        (function (SiteVariables) {
            $(function () {
                init.initVariablesAdmin();
                $('#btnLogOut').click(function () {
                    new Ecart.Ajax.apiConnector().callservice(Ecart.Config.domains.baseUrl + "/User/LogOut", null, Ecart.Ajax.webMethod.Get).done(function () {
                        Ecart.Utility.cookies.eraseCookie(Ecart.Config.cookies.userCookie);
                        $(location).attr('href', '~/UserAuth/index');
                    });
                });
            });
            var init = {
                initVariablesAdmin: function () {
                    var variables = {
                        siteName: Ecart.Config.domains.siteName(),
                        displayName: JSON.parse(Ecart.Utility.cookies.readCookie(Ecart.Config.cookies.userCookie)).name
                    };
                    kendo.bind($("div#wrapper"), kendo.observable(variables));
                }
            };
        })(SiteVariables = Config.SiteVariables || (Config.SiteVariables = {}));
    })(Config = Ecart.Config || (Ecart.Config = {}));
})(Ecart || (Ecart = {}));
//# sourceMappingURL=variableSetter.js.map