using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using App.DBAccess;
using App.Poco;

namespace App.DbService
{
    public class BaseService
    {
        protected Dbase dba = null;
        public BaseService() {
            dba = new Dbase();
        }
    }
}
