using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Utilities
{
    public class ActionDetails
    {
        public Error Error { get; set; }
        public bool State { get; set; }
        public ResponseCode ResponseCode { get; set; }
        public object Content { get; set; }
        public string Message { get; set; }
    }
}
