using App.Bo;
using App.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.DbService
{
    public interface ISitePageDbService {

        ActionDetails ReadContent(Enums.SitePages type,string siteDomain);
        ActionDetails Update(Enums.SitePages type, string siteDomain, string content);
    }

    public class SitePageDbService : BaseService, ISitePageDbService
    {
        public ActionDetails ReadContent(Enums.SitePages type, string siteDomain)
        {
            try
            {
                string content = string.Empty;
                var res = dba.SitePages.Where(p => p.DomainId == siteDomain && p.PageType == (int)type).FirstOrDefault();
                return ResponseMessage.Success(content: (res == null) ? "" : res.ContentInfo.ToString());
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }

        public ActionDetails Update(Enums.SitePages type, string siteDomain,string content)
        {
            try
            { 
                var res = dba.SitePages.Where(p => p.DomainId == siteDomain && p.PageType == (int)type).FirstOrDefault();
                if (res == null)
                {
                    dba.SitePages.Add(new Poco.SitePage {
                         ContentInfo = content,
                         DomainId = siteDomain,
                         PageType = (int)type
                    });
                }
                else {
                    res.ContentInfo = content;
                }
                dba.SaveChanges();
                return ResponseMessage.Success();
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }
    }
}
