using App.Bo;
using App.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.DbService
{
    public interface ISiteSettingsDbService {

        ActionDetails ReadSiteSettings(string domainId);
        ActionDetails UpdateSiteSettings(string domainId,List<SiteSettingsBo> siteInfo);
    }

    public class SiteSettingsDbService : BaseService, ISiteSettingsDbService
    {
       
        public ActionDetails ReadSiteSettings(string domainId)
        {
            try
            {
                var siteSettingInfo = new List<SiteSettingsBo>();
                foreach (var x in dba.SiteGlobleVariables.Where(p => p.DomainId == domainId).ToList()) {
                    siteSettingInfo.Add(new SiteSettingsBo {
                         DomainId = domainId,
                         GlobleKey = (Enums.SiteVariables)x.GlobleKey,
                         Value = x.Value
                    });
                }
                return ResponseMessage.Success(siteSettingInfo);
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex); 
            }
        }

        public ActionDetails UpdateSiteSettings(string domainId,List<SiteSettingsBo> siteInfo)
        {
            try
            {
                dba.SiteGlobleVariables.RemoveRange(dba.SiteGlobleVariables.Where(x => x.DomainId == domainId));
                dba.SaveChanges();
                var sitePoco = new List<Poco.SiteGlobleVariable>();
                foreach (var item in siteInfo)
                {
                    sitePoco.Add(new Poco.SiteGlobleVariable
                    {
                        DomainId = domainId,
                        GlobleKey = (int)item.GlobleKey,
                        Value = item.Value
                    });
                }

                dba.SiteGlobleVariables.AddRange(sitePoco);
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
