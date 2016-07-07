using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Utilities
{
    public class InvaliedLoginExceptions:Exception
    {
        public InvaliedLoginExceptions(string message) : base(message) { }
    }
}
