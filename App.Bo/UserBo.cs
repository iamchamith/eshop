using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Bo
{
    public class UserBo
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? EmailConfirmed { get; set; }
        public string DomainId { get; set; }
        public string Token { get; set; }
    }
}
