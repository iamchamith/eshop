using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECart.Areas.Admin.Models
{
    public class EntitySetupHeaderViewModel
    {
        public Enums.EntityHeader EntityHeader { get; set; }
        public Enums.Crud Crud { get; set; }
        public string Header { get; set; }
        public string CancelNavigateUrl { get; set; }
        public string SaveButtonId { get; set; }
        public string DeleteButtonId { get; set; }
    }
}