using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECart.Areas.Admin.Models
{
    public class Enums
    {
        public enum EntityHeader
        {
            Categories = 0,
            Brands = 1,
            Items = 2
        }
        public enum Crud
        {
            Insert = 0,
            Update = 1,
            Delete = 2,
            Select = 3
        }

        public enum Verification {
            Invelied = -1,
            Email = 0,
            ForgetPassword = 1
        }
    }
}