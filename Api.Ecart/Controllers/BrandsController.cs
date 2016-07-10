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
        [AdminAccessAttribute]
        public JsonResult ReadBrands(string id="0")
        {
            var brandDetails = brandsService.ReadBrands(SessionConfig.DomainId);
            Mapper.CreateMap<BrandBo, BrandViewModel>();
           
            if (brandDetails.ResponseCode == App.Utilities.ResponseCode.Success)
            {
                var list = (List<BrandBo>)brandDetails.Content;
                if (id != null && id != "0")
                {
                    list.Where(p => p.BrandId == id);
                }
                List<BrandViewModel> brands = list.Select(x => AutoMapper.Mapper.Map<BrandViewModel>(x)).ToList();
                foreach (var item in brands)
                {
                    item.Image = $"{GlobleConfig.baseUrlFiles}/{Enums.FileType.Brands.ToString()}/thumb/" + ((item.Image == null) ? "no.jpg" : item.Image);
                }
                brandDetails.Content = brands;
            }
            return new JsonContractResult
            {
                Data = new { data = brandDetails },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        [AdminAccessAttribute]
        public JsonResult ReadBrandsById(string id)
        {
            var brandDetails = brandsService.ReadBrandsById(id);
            Mapper.CreateMap<BrandBo, BrandViewModel>();
            if (brandDetails.ResponseCode == App.Utilities.ResponseCode.Success)
            {
                var brands = Mapper.Map<BrandViewModel>((BrandBo)brandDetails.Content);
                brands.ImagePath = $"{GlobleConfig.baseUrlFiles}/{Enums.FileType.Brands.ToString()}/" + ((brands.Image == null) ? "no.jpg" : brands.Image);
                brandDetails.Content = brands;
            }
            return new JsonContractResult
            {
                Data = new { data = brandDetails },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        [HttpPost]
        [AdminAccessAttribute]
        public JsonResult UpdateBrands(BrandViewModel brand)
        {
            brand.DomainId = SessionConfig.DomainId;
            Mapper.CreateMap<BrandViewModel, BrandBo>();
            return new JsonContractResult
            {
                Data =
                new { data = brandsService.UpdateBrands(Mapper.Map<BrandBo>(brand)) },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        [HttpPost]
        [AdminAccessAttribute]
        public JsonResult CreateBrands(BrandViewModel brand) {

            brand.BrandId = Guid.NewGuid().ToString();
            brand.DomainId = SessionConfig.DomainId;
            Mapper.CreateMap<BrandViewModel, BrandBo>();
            return new JsonContractResult
            {
                Data =
               new { data = brandsService.CreateBrands(Mapper.Map<BrandBo>(brand)) },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        [HttpPost]
        [AdminAccessAttribute]
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
                       BrandId = brandId,
                       DomainId = SessionConfig.DomainId
                   }))
               },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

        }

        [HttpGet]
        [AdminAccessAttribute]
        public JsonResult Search(string query="") {

            var brandDetails = brandsService.ReadBrands(SessionConfig.DomainId);
            Mapper.CreateMap<BrandBo, BrandViewModel>();
            if (brandDetails.ResponseCode == App.Utilities.ResponseCode.Success)
            {
                var list = (List<BrandBo>)brandDetails.Content;
                list = list.Where(p=>p.BrandName.StartsWith(query)).ToList();
                List<BrandViewModel> brands = list.Select(x => AutoMapper.Mapper.Map<BrandViewModel>(x)).ToList();

                var listF = new List<KeyValueViewModel>();
                listF.Add(new KeyValueViewModel
                {
                    Text = "All",
                    Value = "0"
                });
                foreach (var item in brands)
                {
                    listF.Add(new KeyValueViewModel {
                         Text = item.BrandName,
                         Value = item.BrandId
                    });
                }

                brandDetails.Content = listF;
            }
            return new JsonContractResult
            {
                Data = new { data = brandDetails },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

    }
}