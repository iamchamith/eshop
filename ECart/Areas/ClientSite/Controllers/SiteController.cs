using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ECart.Areas.ClientSite.Controllers
{
    public class SiteController : Controller
    {
        // GET: ClientSite/Site
        public ActionResult Index()
        {
            return View();
        }
        [ChildActionOnly]
        public PartialViewResult _ImageSlider() {

            return PartialView();
        }

        [ChildActionOnly]
        public PartialViewResult _TopMenu() {

            return PartialView();
        }
        [ChildActionOnly]
        public PartialViewResult _SiteInfomation() {

            return PartialView();
        }

        [ChildActionOnly]
        public PartialViewResult _ItemInfomation() {
            return PartialView();
        }

        [ChildActionOnly]
        public PartialViewResult _ItemImages() {

            return PartialView();
        }
    }
}