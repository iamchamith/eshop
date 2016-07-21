var Ecart;
(function (Ecart) {
    var Utility;
    (function (Utility) {
        var url = (function () {
            function url() {
            }
            url.prototype.getParameterByName = function (name, url) {
                if (!url)
                    url = window.location.href;
                name = name.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
                if (!results)
                    return null;
                if (!results[2])
                    return '';
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            };
            return url;
        }());
        Utility.url = url;
        Utility.cookies = {
            createCookie: function (name, value, days) {
                if (days === void 0) { days = 365; }
                var expires;
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toString();
                }
                else {
                    expires = "";
                }
                document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
            },
            readCookie: function (name) {
                var nameEQ = encodeURIComponent(name) + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) === ' ')
                        c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) === 0)
                        return decodeURIComponent(c.substring(nameEQ.length, c.length));
                }
                return null;
            },
            eraseCookie: function (name) {
                this.createCookie(name, "", -1);
            }
        };
    })(Utility = Ecart.Utility || (Ecart.Utility = {}));
})(Ecart || (Ecart = {}));
