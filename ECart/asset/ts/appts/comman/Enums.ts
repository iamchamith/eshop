module Ecart.Enums {
    export enum ResponseCode {
        Success = 0,
        ServerError = 1,
        ValidationError = 2,
        Warning = 3,
        Info = 4
    }

    export enum CrudType {
        Insert = 0,
        Update = 1,
        Delete = 3, 
        Select = 4
    }

    export enum EntityType {
        Categories = 0,
        Brands = 1,
        Items = 2
    }

    export enum AuthType {
        Anonymas = 0,
        NotValidateEmail = 1,
        ValidateEmail = 2,
        ValidationError = 3,
        ServerError = 4
    }
}