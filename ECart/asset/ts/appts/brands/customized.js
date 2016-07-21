$(document).ready(function () {
    crud.read();
    $("#sortable-filter").kendoSortable({
        filter: ".sortable"
    });
    $("#sortable-disable").kendoSortable({
        disabled: ".disabled"
    });
});
var crud = {
    read: function () {
        new Ecart.Ajax.apiConnector().callservice("", null, Ecart.Ajax.webMethod.Get).done(function () {
        });
    }
};
