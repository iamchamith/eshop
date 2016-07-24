using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Bo
{
    public class Enums
    {
        public enum FileType
        {
            Brands = 0,
            Categories = 1,
            Products = 2,
            SiteLogo = 3,
            ImageSlider = 4
        }

        public enum AuthType
        {
            Anonymas = 0,
            NotValidateEmail = 1,
            ValidateEmail = 2,
            ValidationError = 3,
            ServerError = 4
        }

        public enum TokenType
        {
            Sorry = -1,
            Email = 0,
            ForgetPassword = 1
        }
        public enum SitePages {

            ContactUs = 0,
            AboutUs = 1
        }
        public enum SiteVariables {
            SiteName  = 0,
            MoneyType = 1,
            PhoneNumber = 2,
            Email = 3,
            Seo = 4,
            Logo = 5,
            Fb = 6
        }
    }
}
