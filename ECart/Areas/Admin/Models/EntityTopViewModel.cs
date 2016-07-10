using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static ECart.Areas.Admin.Models.Enums;

namespace ECart.Areas.Admin.Models
{
    public class EntityTopViewModel
    {
        public EntityHeader EntityHeader { get; set; }
        public string HeaderCaption { get; set; }
        public string SetupUrl { get; set; }
        public string CustomizedUrl { get; set; }
    }
}