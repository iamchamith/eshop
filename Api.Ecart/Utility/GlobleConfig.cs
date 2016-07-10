using Api.Ecart.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Api.Ecart.Utility
{
    public  class GlobleConfig
    {

        public static string baseUrl = "http://localhost:16666";
        public static string baseUrlFiles = "http://localhost:16666/Files";

        // static SessionModel sesssonModel;
        public   GlobleConfig(HttpContext thisContext)
        {
          //  sesssonModel = (SessionModel)thisContext.Session["user"];
        }
    }
   
}