using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Bo
{
    public class ProductsImageBo
    {
        public int Id { get; set; }
        public string ProductId { get; set; }
        public string DomainId { get; set; }
        public string ImagePath { get; set; }
        public bool? IsDefault { get; set; }
    }
}
