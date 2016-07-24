using Api.Ecart.Utility;
using App.Bo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Api.Ecart.Controllers
{
    public class SiteSettingsController : BaseController
    {
        [HttpPost]
        [AdminAccess]
        [CompressContent]
        public JsonResult UpdateDomain(string domain) {

            return null;
        }

        #region site settgins
        //SiteSettings/SiteSettingsRead
        [HttpGet]
        [AdminAccess]
        [CompressContent]
        public JsonResult SiteSettingsRead() {
            return new JsonContractResult
            {
                Data =
                new { data = siteSettings.ReadSiteSettings(SessionConfig.DomainId) },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        //SiteSettings/SiteSettingsUpdate
        [HttpPost]
        [AdminAccess]
        [CompressContent]
        public JsonResult SiteSettingsUpdate(List<SiteSettingsBo> siteInfo) {

            return new JsonContractResult
            {
                Data =
               new { data = siteSettings.UpdateSiteSettings(SessionConfig.DomainId, siteInfo) },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        #endregion

        #region site image slider

        //SiteSettings/ImageSliderInsertImage
        [HttpPost]
        [AdminAccess]
        [CompressContent]
        public JsonResult ImageSliderInsertImage(string image,bool enable=true) {

            return new JsonContractResult
            {
                Data =
                new { data = ImageSlider.InsertImage(SessionConfig.DomainId, image, enable) },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

        }

        [HttpPost]
        [AdminAccess]
        [CompressContent]
        //SiteSettings/ImageSliderDeleteImage
        public JsonResult ImageSliderDeleteImage(string image) {
            return new JsonContractResult
            {
                Data =
               new { data = ImageSlider.DeleteImage(SessionConfig.DomainId, image) },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [HttpPost]
        [AdminAccess]
        [CompressContent]
        //SiteSettings/ImageSliderChangeOrder
        public JsonResult ImageSliderChangeOrder(List<string> order) {
            return new JsonContractResult
            {
                Data =
              new { data = ImageSlider.OrderImages(SessionConfig.DomainId, order) },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [HttpGet]
        [AdminAccess]
        [CompressContent]
        //SiteSettings/ImageSliderReadImage
        public JsonResult ImageSliderReadImage() {
            return new JsonContractResult
            {
                Data =
            new { data = ImageSlider.ReadImage(SessionConfig.DomainId) },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        #endregion

    }
}