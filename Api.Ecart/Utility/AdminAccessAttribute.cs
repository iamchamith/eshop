using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Api.Ecart.Utility
{
    public class AdminAccessAttribute : AuthorizeAttribute
    {
        protected override bool AuthorizeCore(HttpContextBase context)
        {
            return (SessionConfig.Session == null) ? false : true;
        }
    }
}