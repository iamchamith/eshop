var Ecart;
(function (Ecart) {
    var Ajax;
    (function (Ajax) {
        (function (webMethod) {
            webMethod[webMethod["Get"] = 0] = "Get";
            webMethod[webMethod["Post"] = 1] = "Post";
        })(Ajax.webMethod || (Ajax.webMethod = {}));
        var webMethod = Ajax.webMethod;
        var apiConnector = (function () {
            function apiConnector() {
            }
            apiConnector.prototype.callservice = function (url, data, method) {
                var dfd = jQuery.Deferred();
                $.ajax({
                    url: url,
                    method: (method == Ajax.webMethod.Get) ? "GET" : "POST",
                    contentType: "application/json; charset=utf-8",
                    data: (method == webMethod.Get) ? data : JSON.stringify(data),
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        var value = data;
                        dfd.resolve(value);
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        console.log(textStatus);
                        dfd.reject();
                    }
                });
                return dfd;
            };
            return apiConnector;
        }());
        Ajax.apiConnector = apiConnector;
    })(Ajax = Ecart.Ajax || (Ecart.Ajax = {}));
})(Ecart || (Ecart = {}));
