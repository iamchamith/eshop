using Api.Ecart.Utility;
using App.Bo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Api.Ecart.Controllers
{
    public class SiteAdministrationController : BaseController
    {
        #region site pages
        // GET: /SiteAdministration/ReadSitePageTypes
        public JsonResult ReadSitePageTypes() {

            var pageList = new List<FillDropDownBo>();
            foreach (Enums.SitePages val in Enum.GetValues(typeof(Enums.SitePages)))
            {
                pageList.Add(new FillDropDownBo
                {
                    Value = ((int)val).ToString(),
                    Text = val.ToString()
                });
            }
            return new JsonContractResult
            {
                Data = pageList
            };
        }

        [HttpGet]
        public JsonResult ReadSitePageContent(Enums.SitePages type)
        {
            return new JsonContractResult
            {
                Data = siteService.ReadContent(type, "446475")
            };
        }

        [HttpPost]
        [ValidateInput(false)]
        public JsonResult UpdateSitePageContent(Enums.SitePages type,string content) {

            return new JsonContractResult
            {
                Data = siteService.Update(type, "446475", content)
            };
        }

        #endregion
    }
}