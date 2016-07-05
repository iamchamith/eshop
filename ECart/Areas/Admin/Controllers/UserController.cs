using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ECart.Areas.Admin.Controllers
{
    public class UserController : Controller
    {
        // GET: Admin/User/Index
        public ActionResult Index()
        {
            return View();
        }
        [ChildActionOnly]
        public PartialViewResult _ChangePassword() {

            return PartialView();
        }
        [ChildActionOnly]
        public PartialViewResult _UpdateSettings() {

            return PartialView();
        }
        [ChildActionOnly]
        public PartialViewResult _UpdateDomain() {

            return PartialView();
        }
    }
}