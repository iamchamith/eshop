var Ecart;
(function (Ecart) {
    var Config;
    (function (Config) {
        Config.cookies = {
            userCookie: function () {
                return Config.domains.baseUrl() + "_user";
            }
        };
        Config.domains = {
            siteName: function () {
                return "EzCart";
            },
            baseUrl: function () {
                return $('#hndBaseUrl').val();
            },
            siteUrl: function () {
                return 'http://localhost:15800';
            }
        };
    })(Config = Ecart.Config || (Ecart.Config = {}));
})(Ecart || (Ecart = {}));
//# sourceMappingURL=config.js.map