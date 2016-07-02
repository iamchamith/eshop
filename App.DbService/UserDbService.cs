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
        ActionDetails ReadUserInfo(UserBo user);
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
                                     select new { emailConfirim = user.EmailConfirmed,name = user.Name,domainId = userdomain.DomainId }).FirstOrDefault();

                if (userInfo == null)
                {
                    throw new Exception("invalied login");
                }

                var x = new UserBo {
                     Name = userInfo.name,
                     EmailConfirmed =userInfo.emailConfirim,
                     DomainId = userInfo.domainId
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
            throw new NotImplementedException();
        }

        public ActionDetails ReadUserInfo(UserBo user)
        {
            throw new NotImplementedException();
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
    }
}
