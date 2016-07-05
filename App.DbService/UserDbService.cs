using App.Utilities;
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
        ActionDetails RegisterUser(UserBo user);
        ActionDetails ChangePassword(UserChangePasswordBo user);
        ActionDetails ReadUserInfo(string email);
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
                                     select new { emailConfirim = users.EmailConfirmed,name = users.Name,domainId = userdomain.DomainId,email = users.Email }).FirstOrDefault();

                if (userInfo == null)
                {
                    throw new Exception("invalied login");
                }

                var x = new UserBo {
                    Name = userInfo.name,
                    EmailConfirmed = userInfo.emailConfirim,
                    DomainId = userInfo.domainId,
                    Email = userInfo.email
                };

                return ResponseMessage.Success(content: x);
            }
            catch (Exception ex)
            {
               return ResponseMessage.Error(ex, "invalied login info", responseCode: ResponseCode.ValidationError);
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
                var result = dba.Users.Where(p=>p.Email == email).First();
                return ResponseMessage.Success(content: result);
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
                string domainId = Guid.NewGuid().ToString();
                dba.Users.Add(new User
                {
                    CreatedDate = DateTime.Now,
                    Email = user.Email,
                    EmailConfirmed = false,
                    Name = user.Name,
                    Password = user.Password,
                    Token = user.Token
                });
                dba.UserDomains.Add(new Poco.UserDomain
                {
                    UserId = user.Email,
                    DomainId = domainId,
                    Domain = user.Domain,
                    Enable = false
                });
                dba.SaveChanges();
                return ResponseMessage.Success(content: domainId);

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
                                select new { emailConfirim = users.EmailConfirmed, name = users.Name, domainId = userdomain.DomainId, email = users.Email }).FirstOrDefault();


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
 
    }
}
