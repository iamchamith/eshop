using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Api.Ecart.Controllers
{
    public class UserController : Controller
    {
        // GET: User
        public JsonResult Index()
        {
            return Json("hi",JsonRequestBehavior.AllowGet);
        }
    }
}