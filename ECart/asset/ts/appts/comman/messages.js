var Ecart;
(function (Ecart) {
    var Messages;
    (function (Messages) {
        var sweetAlerts = (function () {
            function sweetAlerts() {
            }
            sweetAlerts.prototype.requestConfirm = function (title, text) {
                if (title === void 0) { title = "success"; }
                if (text === void 0) { text = ""; }
                swal({ title: title, text: text, timer: 1000, showConfirmButton: false });
            };
            sweetAlerts.prototype.successAlert = function (title, text) {
                if (title === void 0) { title = "success"; }
                if (text === void 0) { text = ""; }
                swal(title, title, "success");
            };
            sweetAlerts.prototype.errorAlert = function (titile, text) {
                if (titile === void 0) { titile = "Opps"; }
                if (text === void 0) { text = "Something went wrong!"; }
                sweetAlert(titile, text, "error");
            };
            sweetAlerts.prototype.validationError = function (title, errorList) {
                if (title === void 0) { title = "Opps"; }
                var message = "<ul>";
                $.each(errorList, function (i, d) {
                    message += "<li style='color: red'>" + d + "<li/>";
                });
                message += "</ul>";
                swal({ title: title, text: message, type: "error", html: true });
            };
            return sweetAlerts;
        }());
        Messages.sweetAlerts = sweetAlerts;
    })(Messages = Ecart.Messages || (Ecart.Messages = {}));
})(Ecart || (Ecart = {}));
//# sourceMappingURL=messages.js.map