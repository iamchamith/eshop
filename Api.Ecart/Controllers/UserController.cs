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
using Api.Ecart.Models.ModelValidation.UserAuth;

namespace Api.Ecart.Controllers
{
    public class UserController : BaseController
    {

        [HttpGet]
        public ActionResult Index() { return View(); }

        [HttpPost]
        [AllowCrossSiteJson]
        [CompressContent]
        public JsonResult Register(UserViewModel user)
        {
            var res = new ActionDetails();
            var results = new RegistrationValidation().Validate(user);
            if (!results.IsValid)
            {
                return new JsonContractResult
                {
                    Data = new ActionDetails
                    {
                        ResponseCode = ResponseCode.ValidationError,
                        Content = Comman.FluantErrorList(results.Errors),
                        Message = "registration is not success",
                        State = false
                    },
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
            }

            Mapper.CreateMap<UserViewModel, UserBo>();
            var response = userService.RegisterUser(Mapper.Map<UserBo>(user));
            Enums.AuthType auth = Enums.AuthType.Anonymas;
            if (response.ResponseCode == ResponseCode.Success)
            { 
                Mapper.CreateMap<UserBo, SessionModel>();
                SessionConfig.Session = Mapper.Map<SessionModel>((UserBo)response.Content);
                res = new ActionDetails
                {
                    ResponseCode = ResponseCode.Success,
                    Content = SessionConfig.Session,
                    Message = "registration is success",
                    State = true
                };
            }
            else
            {
                res = new ActionDetails
                {
                    ResponseCode = response.ResponseCode,
                    Content = new List<string> { "user deferent domain" },
                    Message = "registration is not success",
                    State = false
                };
            }
            return new JsonContractResult
            {
                Data = res,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [HttpPost]
        [AllowCrossSiteJson]
        [CompressContent]
        public JsonResult Authonticate(UserViewModel user)
        {
            var res = new ActionDetails();
            Mapper.CreateMap<UserViewModel, UserBo>();
            var response = userService.Authenticate(Mapper.Map<UserBo>(user));
            Enums.AuthType auth = Enums.AuthType.Anonymas;
            if (response.ResponseCode == App.Utilities.ResponseCode.Success)
            {
                Mapper.CreateMap<UserBo, SessionModel>();
                var repo = Mapper.Map<SessionModel>((UserBo)response.Content);
                SessionConfig.Session = repo;
                auth = repo.EmailConfirmed ? Enums.AuthType.ValidateEmail : Enums.AuthType.NotValidateEmail;
                res = new ActionDetails
                {
                    ResponseCode = ResponseCode.Success,
                    Content = SessionConfig.Session,
                    Message = "login is success",
                    State = true
                };
            }
            else {
                res = new ActionDetails
                {
                    ResponseCode = ResponseCode.ValidationError,
                    Message = "login is not success",
                    State = false
                };
            }
            return new JsonContractResult
            {
                Data = res,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        //User/ForgetPasswordRequest
        [HttpPost]
        [CompressContent]
        public JsonResult ForgetPasswordRequest(string email) {
            return new JsonContractResult
            {
                Data =  userService.ForgetPasswordRequest(email),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [HttpPost]
        [CompressContent]
        public JsonResult ChangePassword(ChangePasswordViewModel user)
        {
            user.Email = SessionConfig.Email;
            Mapper.CreateMap<ChangePasswordViewModel, UserChangePasswordBo>();
            return new JsonContractResult
            {
                Data =
                new { data = userService.ChangePassword(Mapper.Map<UserChangePasswordBo>(user)) },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [HttpPost]
        [CompressContent]
        public JsonResult UpdateUserDetails(string displayName) {

            return new JsonContractResult
            {
                Data =
                new { data = userService.UpdateUserDetails(SessionConfig.Email,displayName) },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [HttpPost]
        [CompressContent]
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
        [CompressContent]
        public JsonResult GetUserInfo()
        {

            Mapper.CreateMap<UserBo, UserViewModel>();

            var result = userService.ReadUserInfo(SessionConfig.Email);
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
        [CompressContent]
        public JsonResult LogOut()
        {
            Session.Abandon();
            return new JsonContractResult
            {
                Data = ResponseMessage.Success()
            };
        }

        [HttpPost]
        [CompressContent]
        public JsonResult TokenValidate(string token = "", Enums.TokenType type = Enums.TokenType.Sorry,string email="")
        {
            if (type == Enums.TokenType.Sorry){
                return null;
            }
            string _email = (type == Enums.TokenType.Email) ? SessionConfig.Email : email;
            
            Enums.TokenType t = (Enums.TokenType)(int)type;
            var ac = userService.TokenValidate(t, token, _email);

            if (type == Enums.TokenType.Email)
            {
                if (ac.ResponseCode == ResponseCode.Success)
                {
                    SessionConfig.EmailConfirmed = true;
                }
            }
            else if (type == Enums.TokenType.ForgetPassword) {
                var repo = Mapper.Map<SessionModel>((UserBo)ac.Content);
                SessionConfig.Session = repo;
            }

            return new JsonContractResult
            {
                Data = ac
            };
        }
    }
}