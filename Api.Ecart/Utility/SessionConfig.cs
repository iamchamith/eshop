using Api.Ecart.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Api.Ecart.Utility
{
    public class SessionConfig
    {
        public static SessionModel Session
        {
            get
            {
                System.Web.HttpContext context = System.Web.HttpContext.Current;
                if (context.Session["user"] != null)
                {
                    return (SessionModel)context.Session["user"];
                }
                return null;
            }
            set
            {
                System.Web.HttpContext context = System.Web.HttpContext.Current;
                context.Session["user"] = value;
            }
        }

        public static bool EmailConfirmed
        {
            get
            {
                System.Web.HttpContext context = System.Web.HttpContext.Current;
                if (context.Session["user"] != null)
                {
                    return ((SessionModel)context.Session["user"]).EmailConfirmed;
                }
                return false;
            }
            set
            {
                System.Web.HttpContext context = System.Web.HttpContext.Current;
                var model = (SessionModel)context.Session["user"];
                model.EmailConfirmed = value;
                context.Session["user"] = model;
            }
        }

        public static string Email
        {
            get
            {
                System.Web.HttpContext context = System.Web.HttpContext.Current;
                if (context.Session["user"] != null)
                {
                    return ((SessionModel)context.Session["user"]).Email;
                }
                else
                {
                    return null;
                }
            }
        }

        public static string DomainId {
            get
            {
                System.Web.HttpContext context = System.Web.HttpContext.Current;
                if (context.Session["user"] != null)
                {
                    return ((SessionModel)context.Session["user"]).DomainId;
                }
                else
                {
                    throw new Exception("invalied login");
                }
            }
        }
    }
}