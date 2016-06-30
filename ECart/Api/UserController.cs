using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ECart.Api
{
    public class UserController : Controller
    {
        // GET: User
        public JsonResult Index()
        {
            return Json("",JsonRequestBehavior.AllowGet);
        }
    }
}