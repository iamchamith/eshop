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
    public interface IProductsDbService
    {
        ActionDetails CreateProduct(ProductBo Product);
        ActionDetails ReadProducts(string DomainId);
        ActionDetails ReadProductById(string ProductId);
        ActionDetails UpdateProduct(ProductBo Product);
        ActionDetails DeleteProduct(ProductBo Product);
        ActionDetails InsertImage(string imageId, string productId,string domainId);
        ActionDetails DeleteImage(string imageId, string domainId);
        ActionDetails ReadImages(string domainId);
        ActionDetails UpdateImageDefault(string imageId, string domainId);


    }

    public class ProductsDbService : BaseService, IProductsDbService
    {
        public ActionDetails CreateProduct(ProductBo product)
        {
            try
            {
                Mapper.CreateMap<ProductBo, Product>();
                dba.Products.Add(Mapper.Map<Product>(product));
                dba.SaveChanges();
                return ResponseMessage.Success(content:product.ProductId);
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }

        public ActionDetails DeleteProduct(ProductBo product)
        {
            try
            {
                var obj = dba.Products.Where(p => p.ProductId == product.ProductId && p.DomainId == product.DomainId).FirstOrDefault();
                if (obj == null)
                {
                    throw new Exception("Entity canot be found");
                }
                dba.Products.Remove(obj);
                dba.SaveChanges();
                return ResponseMessage.Success();
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }

        public ActionDetails ReadProducts(string DomainId)
        {
            try
            {
                var ProductList = dba.Products.Where(p => p.DomainId == DomainId).ToList();
                Mapper.CreateMap<Product, ProductBo>();
                return ResponseMessage.Success(content: ProductList.Select(x => AutoMapper.Mapper.Map<ProductBo>(x)).ToList());
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }

        public ActionDetails ReadProductById(string ProductId)
        {
            try
            {
                Mapper.CreateMap<Product, ProductBo>();
                var Product = dba.Brands.Where(p => p.BrandId == ProductId).FirstOrDefault();
                if (Product == null)
                {
                    throw new Exception("entity not found");
                }
                return ResponseMessage.Success(content: Mapper.Map<ProductBo>(Product));
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }

        public ActionDetails UpdateProduct(ProductBo product)
        {
            try
            {
                var obj = dba.Products.Where(p => p.ProductId == product.ProductId && p.DomainId == product.DomainId).FirstOrDefault();
                if (obj == null)
                {
                    throw new Exception("entity canot be found");
                }

                obj.Discription = product.Discription;
                obj.Name = product.Name;
                obj.Enable = product.Enable;
                obj.Seo = product.Seo;
                dba.SaveChanges();
                return ResponseMessage.Success();
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }

        public ActionDetails InsertImage(string imageId, string productId, string domainId)
        {
            try
            {
                dba.ProductsImages.Add(new ProductsImage {
                     DomainId = domainId,
                     ImagePath =imageId,
                     IsDefault =false,
                     ProductId =productId,
                });
                dba.SaveChanges();
                return ResponseMessage.Success();
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }

        public ActionDetails DeleteImage(string imageId, string domainId)
        {
            try
            {
                dba.ProductsImages.Remove(dba.ProductsImages.FirstOrDefault(p => p.DomainId == domainId && p.ImagePath == imageId));
                dba.SaveChanges();
                return ResponseMessage.Success();
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }

        public ActionDetails ReadImages(string domainId)
        {
            try
            {
                return ResponseMessage.Success(content: dba.ProductsImages.Where(p => p.DomainId == domainId).ToList());
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }

        public ActionDetails UpdateImageDefault(string imageId, string domainId)
        {
            try
            {
                var x = dba.ProductsImages.FirstOrDefault(p => p.DomainId == domainId && p.ImagePath == imageId);
                if (x == null) {
                    return ResponseMessage.Error("invalied image");
                }
                else
                {
                    var y = dba.ProductsImages.Where(p => p.DomainId == domainId);
                    foreach (var item in y)
                    {
                        item.IsDefault = false;
                    }
                    dba.SaveChanges();
                    x.IsDefault = true;
                    dba.SaveChanges();
                }
                return ResponseMessage.Success(content: dba.ProductsImages.Where(p => p.DomainId == domainId).ToList());
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }
    }
}
