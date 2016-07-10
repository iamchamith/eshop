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
        (function (CrudType) {
            CrudType[CrudType["Insert"] = 0] = "Insert";
            CrudType[CrudType["Update"] = 1] = "Update";
            CrudType[CrudType["Delete"] = 3] = "Delete";
            CrudType[CrudType["Select"] = 4] = "Select";
        })(Enums.CrudType || (Enums.CrudType = {}));
        var CrudType = Enums.CrudType;
        (function (EntityType) {
            EntityType[EntityType["Categories"] = 0] = "Categories";
            EntityType[EntityType["Brands"] = 1] = "Brands";
            EntityType[EntityType["Items"] = 2] = "Items";
        })(Enums.EntityType || (Enums.EntityType = {}));
        var EntityType = Enums.EntityType;
    })(Enums = Ecart.Enums || (Ecart.Enums = {}));
})(Ecart || (Ecart = {}));
//# sourceMappingURL=Enums.js.map