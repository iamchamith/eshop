module Ecart.EntityHeader {

    const baseApi = Ecart.Config.domains.baseUrl();
    $(document).ready(function () {

        init.initControlles();
         
        const browserUrl = window.location.href;
        const mode = new Ecart.Utility.url().getParameterByName("mode", browserUrl);
        if (Number(mode) == Number(Enums.EntityType.Brands)) {
            var url = baseApi + "/Brands/search"
        }

        crud.read(url);
    });


    var init = {
        initControlles: function () {
            $("#ddSearch").kendoComboBox({
                dataTextField: "text",
                dataValueField: "value",
                select: function (e) {
                    Ecart.Brands.View.crud.read(e.item.val());
                }
            });
        }
    }

    var crud = {
        read: function (url: string): void {
            new Ecart.Ajax.apiConnector().callservice(url, null, Ajax.webMethod.Get).done(function (e) {
                $("#ddSearch").data("kendoComboBox").setDataSource(new kendo.data.DataSource({ data: e.data.content }));
                $("#ddSearch").data("kendoComboBox").select(0);
            });
        }
    }
}