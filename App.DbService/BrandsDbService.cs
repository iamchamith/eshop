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
        ActionDetails BrandsOrderList(string domainId);
    }

    public class BrandsDbService : BaseService, IBrandsDbService
    { 
        public ActionDetails CreateBrands(BrandBo brand)
        {
            try
            {
                if (brand.Image == null) { brand.Image = "no.jpg"; }
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
                var brandList = from a in dba.Brands
                                where a.DomainId == DomainId
                                select new
                                {
                                    BrandId = a.BrandId,
                                    BrandName = a.BrandName,
                                    Enable = a.Enable,
                                    Image = a.Image
                                };

                var list = new List<BrandBo>();
                foreach (var item in brandList)
                {
                    list.Add(new BrandBo {
                         BrandId = item.BrandId,
                         BrandName = item.BrandName,
                         Enable = item.Enable,
                         Image = item.Image,
                       
                    });
                }
                Mapper.CreateMap<Brand, BrandBo>();
                return ResponseMessage.Success(content: list);
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
        #region Ordering
        public ActionDetails BrandsOrderList(string domainId)
        {
            try
            {
                var obj = dba.Brands.Where(p => p.DomainId == domainId).ToList();
                if (obj == null)
                {
                    throw new Exception("Brand canot be found");
                }
                return null;
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }
        #endregion
    }
}
