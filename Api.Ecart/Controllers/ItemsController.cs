using Api.Ecart.Utility;
using App.Bo;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AutoMapper;
namespace Api.Ecart.Controllers
{
    public class ItemsController : BaseController 
    {
        [HttpGet]
        [CompressContent]
        [AdminAccess]
        public JsonResult Lookups() {
 
            return new JsonContractResult
            {
                Data = new { data = new { brands = new BrandsController().ReadBrandsProcess(),
                    cat = new CategoriesController().ReadCategoryProcess()
            } },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        [HttpGet]
        [CompressContent]
        [AdminAccess]
        public JsonResult ReadItems() {

            return new JsonContractResult
            {
                Data = new
                {
                    data = productService.ReadProducts(SessionConfig.DomainId)
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [HttpGet]
        [CompressContent]
        [AdminAccess]
        public JsonResult ReadItemsById(string itemId)
        {

            return new JsonContractResult
            {
                Data = new
                {
                    data = productService.ReadProductById(itemId)
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [HttpPost]
        [CompressContent]
        [AdminAccess]
        public JsonResult InsertItem(ProductViewModel ProductViewModel)
        {
            Mapper.CreateMap<ProductViewModel, ProductBo>();
            var x = Mapper.Map<ProductBo>(ProductViewModel);
            x.DomainId = SessionConfig.DomainId;
            x.ProductId = Guid.NewGuid().ToString();
            return new JsonContractResult
            {
                Data = new
                {
                    data = productService.CreateProduct (x)
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        [HttpPost]
        [CompressContent]
        [AdminAccess]
        public JsonResult UpdateItem(ProductViewModel ProductViewModel) {

            Mapper.CreateMap<ProductViewModel, ProductBo>();
            var x = Mapper.Map<ProductBo>(ProductViewModel);
            x.DomainId = SessionConfig.DomainId;
            return new JsonContractResult
            {
                Data = new
                {
                    data = productService.UpdateProduct(x)
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        [HttpPost]
        [CompressContent]
        [AdminAccess]
        public JsonResult DeleteItem(string itemId)
        {
            return new JsonContractResult
            {
                Data = new
                {
                    data = productService.DeleteProduct(new ProductBo {
                        DomainId = SessionConfig.DomainId ,
                        ProductId = itemId
                    })
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        #region maintain product images

        [HttpGet]
        [CompressContent]
        [AdminAccess]
        public JsonResult ReadImages() {
            return new JsonContractResult
            {
                Data = new
                {
                    data = productService.ReadImages(SessionConfig.DomainId)
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        [HttpPost]
        [CompressContent]
        [AdminAccess]
        public JsonResult UpdateImageDefault(string imageId) {
            return new JsonContractResult
            {
                Data = new { data = productService.UpdateImageDefault(imageId, SessionConfig.DomainId) },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        [HttpPost]
        [CompressContent]
        [AdminAccess]
        public JsonResult DeleteImage(string imageId) {
            return new JsonContractResult
            {
                Data = new
                {
                    data = productService.DeleteImage(imageId, SessionConfig.DomainId)
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [HttpPost]
        [CompressContent]
        [AdminAccess]
        public JsonResult InsertImage(string imageId,string productId) {
            return new JsonContractResult
            {
                Data = new
                {
                    data = productService.InsertImage(imageId, productId, SessionConfig.DomainId)
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        #endregion
    }
}