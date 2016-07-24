module Ecart.AdminSite.SitePages {
    const sitePageType = Ecart.Config.domains.baseUrl() + "/SiteAdministration/ReadSitePageTypes";
    const readSitePageContent = Ecart.Config.domains.baseUrl() + "/SiteAdministration/ReadSitePageContent";
    const updateSitePageContent = Ecart.Config.domains.baseUrl() + "/SiteAdministration/UpdateSitePageContent";

    $(function () {
        init.initControlles();
        crud.readSitePageType();
        crud.readPageContent(Number(Ecart.Enums.SitePages.ContactUs));
    });

    var init = {

        initControlles: function () {
            $('#ddSitePageTypes').kendoComboBox({
                dataTextField: "text",
                dataValueField: "value",
                change: function () {
                    crud.readPageContent(Number(this.value()));
                }
            });
            $('#sitePageContent').kendoEditor();
            $('#btnSitePageSave').click(function () {
                crud.updateContent(Number($('#ddSitePageTypes').data("kendoComboBox").value()),
                    $('#sitePageContent').data("kendoEditor").value())
            });
        }
    }

    var crud = {

        readSitePageType: function (): void {
            new Ecart.Ajax.apiConnector().callservice(sitePageType, null, Ajax.webMethod.Get).done(function (e) {
                var cnt = $('#ddSitePageTypes').data("kendoComboBox");
                cnt.setDataSource(new kendo.data.DataSource({ data: e }));
                cnt.select(0);
            });
        },
        readPageContent: function (type: number): void {
            new Ecart.Ajax.apiConnector().callservice(readSitePageContent, { type:type}, Ajax.webMethod.Get).done(function (e) {
                $('#sitePageContent').data("kendoEditor").value(e.content);
            });
        },

        updateContent: function (type: number, content: string): void {

            swal({
                title: "Sure update this content ?",
                text: "",
                type: "info",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
            }, function () {
                new Ecart.Ajax.apiConnector().callservice(updateSitePageContent, { type: type, content: content }, Ajax.webMethod.Post).done(function (e) {
                    if (e.responseCode == Number(Ecart.Enums.ResponseCode.Success)) {
                        swal("Update successfully");
                    } else {
                        new Ecart.Messages.sweetAlerts().errorAlert();
                    }
                });
                
            });
          
        },
    };
}