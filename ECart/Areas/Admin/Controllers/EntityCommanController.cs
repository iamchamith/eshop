using ECart.Areas.Admin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ECart.Areas.Admin.Controllers
{
    public class EntityCommanController : Controller
    {
        // GET: Comman
        public PartialViewResult _EntityTop(Enums.EntityHeader type)
        {
            return PartialView(new EntityTopViewModel
            {
                EntityHeader = type,
                HeaderCaption = type.ToString(),
                SetupUrl = $"/admin/{type.ToString()}/setup",
                CustomizedUrl = $"/admin/{type.ToString()}/customized"
            });
        }
        public PartialViewResult _EntitySetupControlles(Enums.EntityHeader type, Enums.Crud crud = Enums.Crud.Update)
        {
            return PartialView(new EntitySetupHeaderViewModel
            {
                Crud = crud,
                CancelNavigateUrl = $"/admin/{type.ToString()}",
                SaveButtonId = $"btn{type.ToString()}Save",
                EntityHeader = type,
                Header = type.ToString(),
                DeleteButtonId = $"btn{type.ToString()}Delete",
            });
        }
    }
}