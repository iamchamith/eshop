﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using App.DbService;
using Api.Ecart.Utility;
using Api.Ecart.Models;

namespace Api.Ecart.Controllers
{
    public class BaseController : Controller
    { 
        protected IUserDbService userService = null;
        protected IBrandsDbService brandsService = null;
        protected ISitePageDbService siteService = null;
        protected ISiteSettingsDbService siteSettings = null;
        protected ICategoryDbService categoryDbService = null;
        protected IImageSlider ImageSlider = null;
     
        public BaseController()
        {
            userService = new UserDbService();
            brandsService = new BrandsDbService();
            siteService = new SitePageDbService();
            siteSettings = new SiteSettingsDbService();
            categoryDbService = new CategoryDbService();
            ImageSlider = new ImageSlider();
        }

        [HttpGet]
        public ActionResult ApiDoc() {

            return View();
        }
    }
 
}