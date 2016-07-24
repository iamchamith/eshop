using Api.Ecart.Utility;
using App.Bo;
using App.Utilities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Api.Ecart.Controllers
{
    public class CategoriesController : BaseController
    {
        [HttpGet]
        [CompressContent]
        [AdminAccess]
        public JsonResult ReadCategories (string id="0") 
        {
            var categoryDetails = categoryDbService.ReadCategorys(SessionConfig.DomainId);
            Mapper.CreateMap<CategoryBo, CategoryViewModel>();
            if (categoryDetails.ResponseCode == App.Utilities.ResponseCode.Success)
            {
                var list = (List<CategoryBo>)categoryDetails.Content;
                if (id != null && id != "0")
                {
                    list.Where(p => p.Category_Id == id);
                }
                List<CategoryViewModel> brands = list.Select(x => AutoMapper.Mapper.Map<CategoryViewModel>(x)).ToList();
                foreach (var item in brands)
                {
                    item.Image = $"{GlobleConfig.baseUrlFiles}/{Enums.FileType.Categories.ToString()}/thumb/" + ((item.Image == null) ? "no.jpg" : item.Image);
                }
                categoryDetails.Content = brands;
            }
            return new JsonContractResult
            {
                Data = new { data = categoryDetails },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult ReadCategoryById(string id) {

            var x = categoryDbService.ReadCategoryById(id);
            Mapper.CreateMap<CategoryBo, CategoryViewModel>();
            if (x.ResponseCode == ResponseCode.Success)
            {
                x.Content = Mapper.Map<CategoryViewModel>(x.Content);
            }
            return new JsonContractResult
            {
                Data =
              new { data = x },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [HttpPost]
        [CompressContent]
        [AdminAccess]
        public JsonResult UpdateCategories(CategoryViewModel category) {

            category.DomainId = SessionConfig.DomainId;
            Mapper.CreateMap<CategoryViewModel, CategoryBo>();
            return new JsonContractResult
            {
                Data =
                new { data = categoryDbService.UpdateCategory(Mapper.Map<CategoryBo>(category)) },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        [HttpPost]
        [CompressContent]
        [AdminAccess]
        public JsonResult DeleteCategory(string categoryId) {
            Mapper.CreateMap<CategoryViewModel, CategoryBo>();
            return new JsonContractResult
            {
                Data =
               new
               {
                   data = categoryDbService.DeleteCategory(Mapper.Map<CategoryBo>(new CategoryBo
                   {
                       Category_Id = categoryId,
                       DomainId = SessionConfig.DomainId
                   }))
               },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        [HttpPost]
        [CompressContent]
        [AdminAccess]
        public JsonResult InsertCategory(CategoryViewModel category)
        {
            category.Category_Id = Guid.NewGuid().ToString();
            category.DomainId = SessionConfig.DomainId;
            Mapper.CreateMap<CategoryViewModel, CategoryBo>();
            return new JsonContractResult
            {
                Data =
               new { data = categoryDbService.CreateCategory(Mapper.Map<CategoryBo>(category)) },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [HttpGet]
        [CompressContent]
        [AdminAccess]
        public JsonResult ReadCategoryList() {

            return new JsonContractResult
            {
                Data =
               new { data = categoryDbService.ReadCategories(SessionConfig.DomainId) },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }


    }
}