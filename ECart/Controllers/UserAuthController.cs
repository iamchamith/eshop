using ECart.Areas.Admin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ECart.Controllers
{
    public class UserAuthController : BaseController
    {
        [HttpGet]
        public ActionResult Index() {
            return View();
        }

        [HttpPost]
        public ActionResult VerifySessionToken() {

            return null;
        }

        [ChildActionOnly]
        public PartialViewResult _Login() {
            return PartialView();
        }
        [ChildActionOnly]
        public PartialViewResult _Register(){
            return PartialView();
        }
        [ChildActionOnly]
        public PartialViewResult _ForgetPassword() {
            return PartialView();
        }
        [ChildActionOnly]
        public PartialViewResult _EmailValidation(){
            return PartialView();
        }
        [ChildActionOnly]
        public PartialViewResult _NewPassword()
        {
            return PartialView();
        }
        [ChildActionOnly]
        public PartialViewResult _CheckTokenAvailability()
        {
            return PartialView();
        }
        [HttpGet]
        public ActionResult LogOut () {
            return View();
        }
        //UserAuth/Verification
        [HttpGet]
        public ActionResult Verification(Enums.Verification val = Enums.Verification.Invelied) {
            ViewBag.validate = val;
            return View();
        }
    }
}