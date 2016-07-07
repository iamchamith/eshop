var Ecart;
(function (Ecart) {
    var Enums;
    (function (Enums) {
        (function (ResponseCode) {
            ResponseCode[ResponseCode["Success"] = 0] = "Success";
            ResponseCode[ResponseCode["ServerError"] = 1] = "ServerError";
            ResponseCode[ResponseCode["ValidationError"] = 2] = "ValidationError";
            ResponseCode[ResponseCode["Warning"] = 3] = "Warning";
            ResponseCode[ResponseCode["Info"] = 4] = "Info";
        })(Enums.ResponseCode || (Enums.ResponseCode = {}));
        var ResponseCode = Enums.ResponseCode;
    })(Enums = Ecart.Enums || (Ecart.Enums = {}));
})(Ecart || (Ecart = {}));
