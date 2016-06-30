using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Bo
{
   
    public class UserDomainBo
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string DomainId { get; set; }
        public string Domain { get; set; }
        public bool? Enable { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
