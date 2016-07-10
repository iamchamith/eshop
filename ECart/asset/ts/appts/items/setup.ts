module Ecart.Brands.View {

    const baseApi = "http://localhost:16666";
    $(function () {

        const browserUrl = window.location.href;
        const mode = new Ecart.Utility.url().getParameterByName("mode", browserUrl);
        if (Number(mode) == Number(Enums.EntityType.Brands)) {
            var url = baseApi +"/Brands/search"
        }

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

            $('#ddBrand').kendoComboBox();
            $('#ddCategories').kendoMultiSelect();
        }
    }
}