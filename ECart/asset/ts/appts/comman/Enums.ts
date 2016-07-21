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

    export enum SitePages {
        ContactUs = 0,
        AboutUs = 1
    }

    export enum SiteVariables {
        SiteName = 0,
        MoneyType = 1,
        PhoneNumber = 2,
        Email = 3,
        Seo = 4,
        Logo = 5,
        Fb = 6
    }
    export enum FileType {
        Brands = 0,
        Categories = 1,
        Products = 2,
        SiteLogo = 3
    }
}