var Ecart;
(function (Ecart) {
    var Site;
    (function (Site) {
        var Main;
        (function (Main) {
            $(function () {
                init.initControllers();
            });
            var init = {
                initControllers: function () {
                    $('.viewMore').click(function () {
                        viewMode.showModel();
                    });
                    $('.siteInfo').click(function () {
                        siteInfo.showSiteInfoModel();
                    });
                }
            };
            var viewMode = {
                showModel: function () {
                    $('#itemModal').modal('show');
                }
            };
            var siteInfo = {
                showSiteInfoModel: function () {
                    $('#siteInfomationModal').modal('show');
                }
            };
        })(Main = Site.Main || (Site.Main = {}));
    })(Site = Ecart.Site || (Ecart.Site = {}));
})(Ecart || (Ecart = {}));
//# sourceMappingURL=main.js.map