using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ECart.Areas.Admin.Controllers
{
    public class ItemsController : Controller
    {
        // GET: Brands
         
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Setup()
        {
            return View();
        }

        public PartialViewResult _Images() {

            return PartialView();
        }

        public ActionResult Customized()
        {
            return View();
        }
    }
}