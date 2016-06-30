using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Api.Ecart.Startup))]
namespace Api.Ecart
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
             
        }
    }
}
