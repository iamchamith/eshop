﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ECart.Areas.Admin.Controllers
{
    public class HelpController : Controller
    {
        // GET: Admin/Help
        public ActionResult Index()
        {
            return View();
        }
    }
}