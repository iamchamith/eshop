using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Bo
{
    public class BrandBo
    {
        public int Id { get; set; }
        public string BrandId { get; set; }
        public string DomainId { get; set; }
        public string BrandName { get; set; }
        public string BrandDiscription { get; set; }
        public string Seo { get; set; }
        public string Image { get; set; }
        public bool? Enable { get; set; }
    }
}
