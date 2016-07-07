using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Utilities
{
    public class ResponseMessage
    {
        public static ActionDetails Success(object content=null,string message="success") {

            return new ActionDetails
            {
                Content = content,
                Error = null,
                Message = message,
                State = true,
                ResponseCode = ResponseCode.Success
            };
        }

        public static ActionDetails Error(Exception ex, string message = "error", ResponseCode responseCode = ResponseCode.ServerError)
        {
            return new ActionDetails
            {
                Content = null,
                Error = new Utilities.Error
                {
                    Message = ex.Message,
                    StackTrace = ex.StackTrace
                },
                Message = message,
                State = false,
                ResponseCode = responseCode
            };
        }

        public static ActionDetails Error(string message) {

            return new ActionDetails
            {
                Content = null,
                Message = message,
                State = false,
                ResponseCode = ResponseCode.ValidationError
            };
        }
    }
}
