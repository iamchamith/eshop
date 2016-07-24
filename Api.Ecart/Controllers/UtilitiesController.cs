using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Api.Ecart.Models;
using Api.Ecart.Utility;
using App.Utilities;
using System.IO;
using System.Drawing;
using App.Bo;

namespace Api.Ecart.Controllers
{
    public class UtilitiesController : BaseController
    {
        [AdminAccess]
        public JsonResult UploadFile(Enums.FileType fileType)
        {
            try
            {
                var file = Request.Files[0];
                if (file == null)
                {
                    return new JsonContractResult
                    {
                        Data =
                    new { data = new ActionDetails { ResponseCode = ResponseCode.ValidationError, Message = "file is not found" } },
                        JsonRequestBehavior = JsonRequestBehavior.AllowGet
                    };
                }
                var name = Guid.NewGuid().ToString();
                string extension = Path.GetExtension(file.FileName);
                string filename = $"{name}{extension}";
                // reduce original image size
                Image.FromStream(file.InputStream).ReduceSize().Save($"{Server.MapPath("/Files/" + fileType.ToString() + "/")}{filename}");
                //create thumb image
                Image.FromStream(file.InputStream).CreateThumb().Save($"{Server.MapPath("/Files/" + fileType.ToString() + "/thumb/")}{filename}");
                
                string filePath = $@"{GlobleConfig.baseUrl}/Files/{fileType.ToString()}/{name}{extension}";
                return new JsonContractResult
                {
                    Data = new ActionDetails { ResponseCode = ResponseCode.Success, Content = filePath,Message= filename },
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
            }
            catch (Exception ex)
            {
                return new JsonContractResult
                {
                    Data = ResponseMessage.Error(ex, "file is not uploaded"),
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
            }

        }
    }
}