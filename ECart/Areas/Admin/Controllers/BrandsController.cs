using ECart.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ECart.Areas.Admin.Controllers
{
    public class BrandsController : Controller
    {
        [HttpGet]
        //[CompressContent]
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        //[CompressContent]
        public ActionResult Setup()
        {
            return View();
        }
        [HttpGet]
        //[CompressContent]
        public ActionResult Customized() {
            return View();
        }
    }
}