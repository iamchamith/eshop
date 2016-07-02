/// <reference path="../assets/typescript/kendo.all.d.ts" />
/// <reference path="../assets/typescript/jquery.d.ts" />

module EventDetailView {

    var dataLength = 0;
    var startPos = 0;

    $(document).ready(function () {
        let _form = new form();
        _form.bindValues(0);
        infiniteLoad();
        function infiniteLoad() {
            $(window).on('scroll', () => {
                var h1 = $(document).height() - $(window).height();
                var h2 = $(window).scrollTop() + 350;
                if (h2 >= h1 && dataLength > 0) {
                    startPos = startPos + 6 - 1;
                    new form().bindValues(startPos);
                }
            });
        }

    });

    export class form {

        bindValues(val) {
 
            $.getJSON('sampleJson.json')
                .done(function (data) {
                    // bind users
                    var template = kendo.template($("#lstSubAccounts").html());
                    var dataSource = new kendo.data.DataSource();

                    dataSource.data(data);
                    $.each(dataSource.data(), function (i, d) {
                        console.log(template(d));
                        $("#userGroup").before(template(d));
                    });
                    dataSource.read();
                    dataLength = data.length;
                });
 
        }
    }
}