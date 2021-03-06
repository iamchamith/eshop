﻿using App.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using App.Poco;
using App.Bo;
using AutoMapper;
 
namespace App.DbService
{
    public interface IUserDbService {

        ActionDetails Authenticate(UserBo user);
        ActionDetails Authenticate(string email);
        ActionDetails RegisterUser(UserBo user);
        ActionDetails ChangePassword(UserChangePasswordBo user);
        ActionDetails ReadUserInfo(string email);
        ActionDetails TokenValidate(Enums.TokenType type,string token,string email);
        ActionDetails ForgetPasswordRequest(string email);
        ActionDetails UpdateUserDetails(string email,string name);
    }


    public class UserDbService : BaseService, IUserDbService
    {
        public ActionDetails Authenticate(UserBo user)
        {
            try
            {
                var userInfo = (from users in dba.Users
                                join userdomain in dba.UserDomains on users.UserDomains.ToList().FirstOrDefault().DomainId equals userdomain.DomainId
                                where users.Email == user.Email && users.Password == user.Password
                                select new { emailConfirim = users.EmailConfirmed, name = users.Name, domainId = userdomain.DomainId, email = users.Email,enable=userdomain.Enable }).FirstOrDefault();

                if (userInfo == null)
                {
                    throw new InvaliedLoginExceptions("username or password is wrong");
                }

                var x = new UserBo
                {
                    Name = userInfo.name,
                    EmailConfirmed = userInfo.emailConfirim,
                    DomainId = userInfo.domainId,
                    Email = userInfo.email
                };

                return ResponseMessage.Success(content: x);
            }
            catch (InvaliedLoginExceptions ex) {
                return ResponseMessage.Error(ex.Message);
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex, "invalied login info", responseCode: ResponseCode.ServerError);
            }
        }

        public ActionDetails Authenticate(string email)
        {
            try
            {
                var userInfo = (from users in dba.Users
                                join userdomain in dba.UserDomains on users.UserDomains.ToList().FirstOrDefault().DomainId equals userdomain.DomainId
                                where users.Email == email
                                select new { emailConfirim = users.EmailConfirmed, name = users.Name, domainId = userdomain.DomainId, email = users.Email, enable = userdomain.Enable }).FirstOrDefault();

                if (userInfo == null)
                {
                    throw new InvaliedLoginExceptions("username or password is wrong");
                }

                var x = new UserBo
                {
                    Name = userInfo.name,
                    EmailConfirmed = userInfo.emailConfirim,
                    DomainId = userInfo.domainId,
                    Email = userInfo.email
                };

                return ResponseMessage.Success(content: x);
            }
            catch (InvaliedLoginExceptions ex)
            {
                return ResponseMessage.Error(ex.Message);
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex, "invalied login info", responseCode: ResponseCode.ServerError);
            }
        }

        public ActionDetails ChangePassword(UserChangePasswordBo user)
        {
            try
            {
                if (Authenticate(new UserBo
                {
                    Email = user.Email,
                    Password = user.Password
                }).ResponseCode != ResponseCode.Success)
                {
                    throw new Exception("invalied current password");
                }

                var result = dba.Users.Where(p => p.Email == user.Email).First();
                result.Password = user.NewPassword;
                return ResponseMessage.Success(content: null,message:"password change is success");
            }
            catch (Exception ex) {

                return ResponseMessage.Error(ex, "invalied current password", responseCode: ResponseCode.ValidationError);
            }
        }

        public ActionDetails ReadUserInfo(string email)
        {
            try
            {
                var list = (from a in dba.Users
                            join r in dba.UserDomains on a.Email equals r.UserId
                            where a.Email == email
                              select new { Email = a.Email, Name = a.Name, CreatedDate = a.CreatedDate,Domain = r.Domain }).ToList();
 
                var  result= list.Select(x => new UserBo
                {
                    CreatedDate = x.CreatedDate,
                    Name = x.Name,
                    Email = x.Email
                }).First();

                var responseDic = new Dictionary<int, object>();
                responseDic.Add(0, result);
                responseDic.Add(1, list.First().Domain);
                return ResponseMessage.Success(content: responseDic);
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex, "user not found", responseCode: ResponseCode.ValidationError);
            }
        }

        public ActionDetails RegisterUser(UserBo user)
        {
            try
            {
                //validate domain...
                if ((bool)new WebSiteDbService().CheckDomainAvaiable(user.Domain, user.Email).Content == false) {

                    return ResponseMessage.Error("domain already there");
                }

                string domainId = Guid.NewGuid().ToString();
                string activateToken = Guid.NewGuid().ToString();
                dba.Users.Add(new User
                {
                    CreatedDate = DateTime.Now,
                    Email = user.Email,
                    EmailConfirmed = false,
                    Name = user.Name,
                    Password = user.Password,
                    Token = activateToken,
                    TokenType = (int)Enums.TokenType.Email

                });
                dba.UserDomains.Add(new Poco.UserDomain
                {
                    UserId = user.Email,
                    DomainId = domainId,
                    Domain = user.Domain,
                    Enable = false,
                    CreatedDate = DateTime.Today
                });
                dba.SaveChanges();
                var x = new UserBo
                {
                    Name = user.Name,
                    EmailConfirmed = false,
                    DomainId = domainId,
                    Email = user.Email
                };
                return ResponseMessage.Success(content: x);

            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex, "registration is not success", responseCode: ResponseCode.ValidationError);
            }
        }

        public ActionDetails ConfirmEmail(string token) {

            try
            {
                var response = dba.Users.Where(p => p.Token == token).FirstOrDefault();
                if (response == null)
                {
                    throw new Exception("invalied token");
                }
                response.EmailConfirmed = true;
                dba.SaveChanges();

                var userInfo = (from users in dba.Users
                                join userdomain in dba.UserDomains on users.UserDomains.ToList().FirstOrDefault().DomainId equals userdomain.DomainId
                                where users.Email == response.Email 
                                select new { emailConfirim = users.EmailConfirmed,
                                    name = users.Name,
                                    domainId = userdomain.DomainId,
                                    email = users.Email,
                                    enable = userdomain.Enable 
                                }).FirstOrDefault();


                if (userInfo == null)
                {
                    throw new Exception("invalied login");
                }

                var x = new UserBo
                {
                    Name = userInfo.name,
                    EmailConfirmed = userInfo.emailConfirim,
                    DomainId = userInfo.domainId,
                    Email = userInfo.email
                };
                return ResponseMessage.Success(content: x);
            }
            catch (Exception ex) {

                return ResponseMessage.Error(ex, "invalied token", responseCode: ResponseCode.ValidationError);
            }
        }

        public ActionDetails TokenValidate(Enums.TokenType type, string token,string email)
        {
            try
            {
                var res = dba.Users.Where(p => p.TokenType == (int)type && p.Email == email && p.Token == token).FirstOrDefault();
                if (res == null)
                {
                    return ResponseMessage.Error("invalied token");
                }
                else {
                    if (type == Enums.TokenType.Email)
                    {
                        res.EmailConfirmed = true;
                        dba.SaveChanges();
                    }
                }
                return ResponseMessage.Success(content: Authenticate(email).Content);
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }

        public ActionDetails ForgetPasswordRequest(string email) {
            try
            {
                var userObj = dba.Users.Where(p => p.Email == email).FirstOrDefault();
                if (userObj==null)
                {
                    return ResponseMessage.Error("invalied email");
                }
                else
                {
                    userObj.Token = Guid.NewGuid().ToString();
                    userObj.TokenType = (int)Enums.TokenType.ForgetPassword;
                    dba.SaveChanges();
                    // send email
                    return ResponseMessage.Success("token has been sended");
                }
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }

        public ActionDetails UpdateUserDetails(string email, string name)
        {
            try
            {
                var user = dba.Users.Where(p => p.Email == email).FirstOrDefault();
                if (user==null)
                {
                    return ResponseMessage.Error("user not found");
                }
                else
                {
                    user.Name = name;
                    dba.SaveChanges();
                }
                return ResponseMessage.Success();
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }
    }
}
