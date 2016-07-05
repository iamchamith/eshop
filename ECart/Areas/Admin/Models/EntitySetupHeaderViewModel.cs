using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECart.Areas.Admin.Models
{
    public class EntitySetupHeaderViewModel
    {
        public EntityHeader EntityHeader { get; set; }
        public string Header { get; set; }
        public string CancelNavigateUrl { get; set; }
        public string SaveButtonId { get; set; }
    }
}