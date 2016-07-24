module Ecart.Animation {

   export var ajaxRequest = {

        startWaiting: function (element: any): void {

            $('#' + element).val('wait...').addClass('disabled');
        },
        stopWaiting: function (element: any,caption:string): void {
            $('#' + element).val(caption).removeClass('disabled');
        }
    }
}