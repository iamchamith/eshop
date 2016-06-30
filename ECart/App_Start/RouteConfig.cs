using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ECart
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
              "Default", // Route name
              "{controller}/{action}/{id}", // URL with parameters
              new { controller = "Home", action = "Index", id = UrlParameter.Optional },
              new string[] { "CustomControllerFactory.Controllers" } // Namespace
          );

            routes.MapRoute(
                   "Api",
                   "Api/{controller}/{action}/{id}",
                    new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                    new string[] { "ECart.Api" } // Namespace
              );
        }
    }
}
