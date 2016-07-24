module Ecart.Config {

    export var cookies = {

        userCookie: function (): string {
            return domains.baseUrl() + "_user"; 
        }
    }

    export var domains = {

        siteName: function () {
            return "EzCart";
        },
        baseUrl: function () {
            return $('#hndBaseUrl').val();
        },
        siteUrl: function () {
            return 'http://localhost:15800';
        } 
    }

}
 

