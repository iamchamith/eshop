module Ecart.Site.Main {

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
    }

    var viewMode = {

        showModel: function () {
            $('#itemModal').modal('show');
        }
    }

    var siteInfo = {

        showSiteInfoModel: function () {
            $('#siteInfomationModal').modal('show');

        }
    }
}