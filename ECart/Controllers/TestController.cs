using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ECart.Controllers
{
    public class TestController : Controller
    {

        [HttpGet]
        public JsonResult GetPosts(int begin)
        {

            return Json(new Posts().GetPostsPaging(begin), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetAllPost() {

            return Json(new Posts().GetPosts(), JsonRequestBehavior.AllowGet);
        }

        public class Posts
        {

            List<Post> LstPosts = new List<Post>();

            public List<Post> GetPostsPaging(int begin, int index = 9)
            {

                return GetPosts().Skip(begin).Take(index).ToList();
            }

            public List<Post> GetPosts()
            {

                for (int i = 0; i < 100; i++)
                {
                    LstPosts.Add(new Post
                    {
                        Image = "http://srilankanspuwath.co.uk/web/wp-content/uploads/2013/01/Sri-Lanka-logo.jpg",
                        PostID = i,
                        PostName = $"post name {i}"
                    });

                }
                return LstPosts;
            }
        }

        public class Post
        {

            public int PostID { get; set; }
            public string PostName { get; set; }
            public string Image { get; set; }
        }

    }
}