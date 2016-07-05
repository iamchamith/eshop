module Ecart.Brands.View {

    $(function () {

        init.initControlles();
    });

    var init= {

        initControlles: function () {
            $("#txtDiscription").kendoEditor({
                resizable: {
                    content: true,
                    toolbar: true
                }
            });
            $("#ddCategoryParent").kendoComboBox({
                dataValueField: "value",
                dataTextField : "text"
            });
        }
    }
}