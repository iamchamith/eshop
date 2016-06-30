using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Bo
{
    public class CategoryBo
    {
        public int Id { get; set; }
        public string Category_Id { get; set; }
        public string DomainId { get; set; }
        public string Name { get; set; }
        public string Discription { get; set; }
        public string Seo { get; set; }
        public string Image { get; set; }
        public string Parent { get; set; }
        public bool? Enable { get; set; }
    }
}
