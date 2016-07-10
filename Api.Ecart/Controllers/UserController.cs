using Api.Ecart.Models;
using App.Bo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AutoMapper;
using Api.Ecart.Utility;
using App.Utilities;

namespace Api.Ecart.Controllers
{
    public class UserController : BaseController
    {
        [HttpPost]
        [AllowCrossSiteJson]
        public JsonResult Register(UserViewModel user)
        {
            Mapper.CreateMap<UserViewModel, UserBo>();
            var response = userService.RegisterUser(Mapper.Map<UserBo>(user));
            Enums.AuthType auth = Enums.AuthType.Anonymas;
            if (response.ResponseCode == ResponseCode.Success)
            {
                Mapper.CreateMap<UserBo, SessionModel>();
                Session["user"] = Mapper.Map<SessionModel>((UserBo)response.Content);
                auth = Enums.AuthType.NotValidateEmail;
            }
            else
            {
                auth = Enums.AuthType.ValidationError;
            }
            return new JsonContractResult
            {
                Data =
                new { data = (int)auth },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        [HttpPost]
        [AllowCrossSiteJson]
        public JsonResult Authonticate(UserViewModel user)
        {

            Mapper.CreateMap<UserViewModel, UserBo>();
            var response = userService.Authenticate(Mapper.Map<UserBo>(user));
            Enums.AuthType auth = Enums.AuthType.Anonymas;
            if (response.ResponseCode == App.Utilities.ResponseCode.Success)
            {
                Mapper.CreateMap<UserBo, SessionModel>();
                var repo = Mapper.Map<SessionModel>((UserBo)response.Content);
                Session["user"] = repo;
                auth = repo.EmailConfirmed ? Enums.AuthType.ValidateEmail : Enums.AuthType.NotValidateEmail;
            }
            return new JsonContractResult
            {
                Data = (int)auth,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        [HttpPost]
        public JsonResult ChangePassword(ChangePasswordViewModel user)
        {

            Mapper.CreateMap<ChangePasswordViewModel, UserChangePasswordBo>();
            return new JsonContractResult
            {
                Data =
                new { data = userService.ChangePassword(Mapper.Map<UserChangePasswordBo>(user)) },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        [HttpPost]
        public JsonResult ChangeSettings(ChangePasswordViewModel user)
        {

            Mapper.CreateMap<ChangePasswordViewModel, UserChangePasswordBo>();
            return new JsonContractResult
            {
                Data =
                new { data = userService.ChangePassword(Mapper.Map<UserChangePasswordBo>(user)) },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        //User/GetUserInfo
        [HttpGet]
        public JsonResult GetUserInfo()
        {

            Mapper.CreateMap<UserBo, UserViewModel>();

            var result = userService.ReadUserInfo("iamchamith@gmail.com");
            result.Content = Mapper.Map<UserViewModel>((UserBo)result.Content);
            return new JsonContractResult
            {
                Data =
                new
                {
                    data = new
                    {
                        user = result,
                        domain = "google.com"
                    }
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [HttpGet]
        public JsonResult LogOut()
        {
            Session.Abandon();
            return new JsonContractResult
            {
                Data = ResponseMessage.Success()
            };
        }

        [HttpPost]
        public JsonResult TokenValidate(string token = "", Enums.TokenType type = Enums.TokenType.Sorry)
        {
            if (type == Enums.TokenType.Sorry){
                return null;
            }
            App.DbService.Util.Enums.TokenType t = (App.DbService.Util.Enums.TokenType)(int)type;
            return new JsonContractResult
            {
                Data = userService.TokenValidate(t, token, "")
            };
        }
    }
}