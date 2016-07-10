using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Api.Ecart.Models
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmNewPassword { get; set; }
        public string Name { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? EmailConfirmed { get; set; }
        public string Token { get; set; }
        public string Domain { get; set; }
    }
}