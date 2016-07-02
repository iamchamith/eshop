using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Api.Ecart.Models
{
    public class ChangePasswordViewModel : UserViewModel
    {
        public string NewPassword { get; set; }
    }
}