using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using App.DbService;
namespace Api.Ecart.Controllers
{
    public class BaseController : Controller
    { 
        protected IUserDbService userService = null;
        protected IBrandsDbService brandsService = null;
        public BaseController()
        {
            userService = new UserDbService();
            brandsService = new BrandsDbService();
        }
    }
 
}