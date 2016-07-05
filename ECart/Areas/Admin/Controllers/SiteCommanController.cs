using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ECart.Areas.Admin.Controllers
{
    public class SiteCommanController : Controller
    {
        // GET: Admin/SiteComman
        public PartialViewResult _LeftMenu()
        {
            return PartialView();
        }
    }
}