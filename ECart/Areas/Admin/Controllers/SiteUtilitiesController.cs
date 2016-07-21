using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ECart.Areas.Admin.Controllers
{
    public class SiteUtilitiesController : Controller
    {
        // GET: Admin/SiteUtilities
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public ActionResult SitePages() {

            return View();
        }

        [HttpGet]
        public ActionResult SiteSettings() {
            return View();
        }
    }
}