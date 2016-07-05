using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Api.Ecart.Models
{
    public class SessionModel
    {
        public string Name { get; set; }
        public string DomainId { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
    }
}