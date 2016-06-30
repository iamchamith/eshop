using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ECart.Startup))]
namespace ECart
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
