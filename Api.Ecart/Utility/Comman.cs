using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Api.Ecart.Utility
{
    public class Comman
    {
        public static List<string> FluantErrorList(IList<ValidationFailure> errors) {

            var errorList = new List<string>();
            foreach (var item in errors)
            {
                errorList.Add(item.ErrorMessage);
            }
            return errorList;
        }
        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }
        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }
    }
}