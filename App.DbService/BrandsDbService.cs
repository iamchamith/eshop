using App.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using App.Poco;
using App.Bo;
using AutoMapper;

namespace App.DbService
{
    public interface IBrandsDbService
    { 
        ActionDetails CreateBrands(BrandBo brand);
        ActionDetails ReadBrands(string DomainId);
        ActionDetails ReadBrandsById(string BrandId);
        ActionDetails UpdateBrands(BrandBo brand);
        ActionDetails DeleteBrand(BrandBo brand);
    }

    public class BrandsDbService : BaseService, IBrandsDbService
    {
        public ActionDetails CreateBrands(BrandBo brand)
        {
            try
            {
                Mapper.CreateMap<BrandBo, Brand>();
                dba.Brands.Add(Mapper.Map<Brand>(brand));
                dba.SaveChanges();
                return ResponseMessage.Success();
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }

        public ActionDetails DeleteBrand(BrandBo brand)
        {
            try
            {
                var obj = dba.Brands.Where(p => p.BrandId == brand.BrandId && p.DomainId == brand.DomainId).FirstOrDefault();
                if (obj==null)
                {
                    throw new Exception("Brand canot be found");
                }
                dba.Brands.Remove(obj);
                dba.SaveChanges();
                return ResponseMessage.Success();
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }

        public ActionDetails ReadBrands(string DomainId)
        {
            try
            {
                var brandList = dba.Brands.Where(p => p.DomainId == DomainId).ToList();
                Mapper.CreateMap<Brand, BrandBo>();
                return ResponseMessage.Success(content: brandList.Select(x => AutoMapper.Mapper.Map<BrandBo>(x)).ToList());
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }

        public ActionDetails ReadBrandsById(string BrandId)
        {
            try
            {
                Mapper.CreateMap<Brand, BrandBo>();
                var brand = dba.Brands.Where(p => p.BrandId == BrandId).FirstOrDefault();
                if (brand == null)
                {
                    throw new Exception("brand not found");
                }

                return ResponseMessage.Success(content: Mapper.Map<BrandBo>(brand));
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }

        public ActionDetails UpdateBrands(BrandBo brand)
        {
            try
            {
                var obj = dba.Brands.Where(p => p.BrandId == brand.BrandId && p.DomainId == brand.DomainId).FirstOrDefault();
                if (obj == null)
                {
                    throw new Exception("Brand canot be found");
                }

                obj.BrandDiscription = brand.BrandDiscription;
                obj.BrandName = brand.BrandName;
                obj.Enable = brand.Enable;
                obj.Image = brand.Image;
                obj.Seo = brand.Seo;
                dba.SaveChanges();
                return ResponseMessage.Success();
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }
    }
}
