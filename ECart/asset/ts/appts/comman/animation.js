var Ecart;
(function (Ecart) {
    var Animation;
    (function (Animation) {
        Animation.ajaxRequest = {
            startWaiting: function (element) {
                $('#' + element).val('wait...').addClass('disabled');
            },
            stopWaiting: function (element, caption) {
                $('#' + element).val(caption).removeClass('disabled');
            }
        };
    })(Animation = Ecart.Animation || (Ecart.Animation = {}));
})(Ecart || (Ecart = {}));
