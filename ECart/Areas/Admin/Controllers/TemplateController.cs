﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ECart.Areas.Admin.Controllers
{
    public class TemplateController : Controller
    {
        // GET: Admin/Template
        public ActionResult Index()
        {
            return View();
        }
    }
}