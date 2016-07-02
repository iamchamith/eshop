using Api.Ecart.Models;
using App.Bo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AutoMapper;
using Api.Ecart.Utility;

namespace Api.Ecart.Controllers
{
    public class UserController : BaseController
    {
        [HttpPost]
        public JsonResult Register(UserViewModel user)
        {
            Mapper.CreateMap<UserViewModel, UserBo>();
            return new JsonContractResult { Data = 
                new { data = userService.RegisterUser(Mapper.Map<UserBo>(user)) },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [HttpPost]
        public JsonResult Authonticate(UserViewModel user) {

            Mapper.CreateMap<UserViewModel, UserBo>();
            return new JsonContractResult
            {
                Data =
                new { data = userService.Authenticate(Mapper.Map<UserBo>(user)) },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        [HttpPost]
        public JsonResult ChangePassword(ChangePasswordViewModel user) {

            Mapper.CreateMap<ChangePasswordViewModel, UserChangePasswordBo>();
            return new JsonContractResult
            {
                Data =
                new { data = userService.ChangePassword(Mapper.Map<UserChangePasswordBo>(user)) },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        [HttpPost]
        public JsonResult ChangeSettings(ChangePasswordViewModel user) {

            Mapper.CreateMap<ChangePasswordViewModel, UserChangePasswordBo>();
            return new JsonContractResult
            {
                Data =
                new { data = userService.ChangePassword(Mapper.Map<UserChangePasswordBo>(user)) },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
    }
}