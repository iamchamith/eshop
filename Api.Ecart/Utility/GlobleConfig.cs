using Api.Ecart.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Api.Ecart.Utility
{
    public  class GlobleConfig
    {
       // static SessionModel sesssonModel;
        public   GlobleConfig(HttpContext thisContext)
        {
          //  sesssonModel = (SessionModel)thisContext.Session["user"];
        }
    }
   
}