var Ecart;
(function (Ecart) {
    var User;
    (function (User) {
        $(function () {
        });
        function logout() {
            new Ecart.Ajax.apiConnector().callservice("", null, Ecart.Ajax.webMethod.Get).done(function (e) {
            });
        }
    })(User = Ecart.User || (Ecart.User = {}));
})(Ecart || (Ecart = {}));
