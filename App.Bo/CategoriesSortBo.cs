using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Bo
{
    public class CategoriesSortBo
    {
        public int Id { get; set; }
        public string DomainId { get; set; }
        public string CategoryId { get; set; }
        public int? SortOrder { get; set; }
    }
}
