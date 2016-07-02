using Api.Ecart.Models;
using App.Bo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AutoMapper;
using Api.Ecart.Utility;

namespace Api.Ecart.Controllers
{
    public class BrandsController : BaseController
    {
        // GET: Brands
        public JsonResult ReaBrands()
        {
            return new JsonContractResult
            {
                Data =
                new { data = brandsService.ReadBrands("123") },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult ReadBrandsById(string brandId)
        {
            return new JsonContractResult
            {
                Data =
                new { data = brandsService.ReadBrandsById(brandId) },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult UpdateBrands(BrandViewModel brand)
        {
            Mapper.CreateMap<BrandViewModel, BrandBo>();
            return new JsonContractResult
            {
                Data =
                new { data = brandsService.UpdateBrands(Mapper.Map<BrandBo>(brand)) },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult CreateBrands(BrandViewModel brand) {

            Mapper.CreateMap<BrandViewModel, BrandBo>();
            return new JsonContractResult
            {
                Data =
               new { data = brandsService.CreateBrands(Mapper.Map<BrandBo>(brand)) },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult DeleteBrand(string brandId)
        {

            Mapper.CreateMap<BrandViewModel, BrandBo>();
            return new JsonContractResult
            {
                Data =
               new
               {
                   data = brandsService.DeleteBrand(Mapper.Map<BrandBo>(new BrandViewModel
                   {
                       BrandId = brandId
                   }))
               },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

        }

    }
}