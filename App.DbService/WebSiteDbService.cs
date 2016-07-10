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
    public interface IWebSiteDbService {

        ActionDetails CheckDomainAvaiable(string domain,string email);
        ActionDetails UpdateDomain(string domain,string email);
    }

    public class WebSiteDbService:BaseService, IWebSiteDbService
    {
        public ActionDetails CheckDomainAvaiable(string domain, string email)
        {
            try
            {
                bool? domainCount = (dba.UserDomains.Count(p => p.Domain == domain)>1)?false:true;
                return ResponseMessage.Success(domainCount);
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }

        public ActionDetails UpdateDomain(string domain, string email)
        {
            try
            {
                var response = CheckDomainAvaiable(domain, email);
                if (response.ResponseCode == ResponseCode.Success)
                {
                    var obj = dba.UserDomains.Where(p => p.UserId == email).First();
                    obj.Domain = domain;
                    obj.CreatedDate = DateTime.Now;
                    dba.SaveChanges();
                    return ResponseMessage.Success();
                }
                else
                {
                    return response;
                }
            }
            catch (Exception ex) { return ResponseMessage.Error(ex); }
        }

    }
}
