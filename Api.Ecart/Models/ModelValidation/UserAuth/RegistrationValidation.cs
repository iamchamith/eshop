using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FluentValidation;
namespace Api.Ecart.Models.ModelValidation.UserAuth
{
    public class RegistrationValidation : AbstractValidator<UserViewModel>
    {
        public RegistrationValidation()
        {
            RuleFor(p => p.Domain).NotEmpty().WithMessage("Please insert domain");
            RuleFor(p => p.Email).NotEmpty().EmailAddress().WithMessage("insert valied email") ;
            RuleFor(p => p.Password).NotEmpty().Length(3, 10).WithMessage("password must be 3 - 10 char");
            RuleFor(p => p.Password).Equal(p => p.ConfirmNewPassword).WithMessage("2 password must be same");
        }
 
    }
}