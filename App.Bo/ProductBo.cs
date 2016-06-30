using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Bo
{
    public class ProductBo
    {
        public int Id { get; set; }
        public string ProductId { get; set; }
        public string DomainId { get; set; }
        public string Discription { get; set; }
        public string Seo { get; set; }
        public bool? Enable { get; set; }
        public string BrandId { get; set; }
        public string Price { get; set; }
        public string Name { get; set; }
    }
}
