using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Utilities
{
    public enum ResponseCode {
        Success = 0,
        ServerError = 1,
        ValidationError = 2,
        Warning = 3,
        Info = 4
    }
}
