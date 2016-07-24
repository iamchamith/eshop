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
    public interface ICategoryDbService
    {
        ActionDetails CreateCategory(CategoryBo category);
        ActionDetails ReadCategorys(string DomainId);
        ActionDetails ReadCategoryById(string categoryId);
        ActionDetails UpdateCategory(CategoryBo category);
        ActionDetails DeleteCategory(CategoryBo category);
        ActionDetails ReadCategories(string domainId);
    }

    public class CategoryDbService : BaseService, ICategoryDbService
    {
        public ActionDetails CreateCategory(CategoryBo category)
        {
            try
            {
                Mapper.CreateMap<CategoryBo, Category>();
                dba.Categories.Add(Mapper.Map<Category>(category));
                dba.SaveChanges();
                return ResponseMessage.Success();
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }

        public ActionDetails DeleteCategory(CategoryBo category)
        {
            try
            {
                var obj = dba.Categories.Where(p => p.Category_Id == category.Category_Id && p.DomainId == category.DomainId).FirstOrDefault();
                if (obj == null)
                {
                    throw new Exception("Entity canot be found");
                }
                dba.Categories.Remove(obj);
                dba.SaveChanges();
                return ResponseMessage.Success();
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }

        public ActionDetails ReadCategorys(string DomainId)
        {
            try
            {
                var categoryList = dba.Categories.Where(p => p.DomainId == DomainId).ToList();
                Mapper.CreateMap<Category, CategoryBo>();
                return ResponseMessage.Success(content: categoryList.Select(x => AutoMapper.Mapper.Map<CategoryBo>(x)).ToList());
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }

        public ActionDetails ReadCategoryById(string categoryId)
        {
            try
            {
                Mapper.CreateMap<Category, CategoryBo>();
                var category = dba.Categories.Where(p => p.Category_Id == categoryId).FirstOrDefault();
                if (category == null)
                {
                    throw new Exception("entity not found");
                }
                return ResponseMessage.Success(content: Mapper.Map<CategoryBo>(category));
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }

        public ActionDetails UpdateCategory(CategoryBo category)
        {
            try
            {
                var obj = dba.Categories.Where(p => p.Category_Id == category.Category_Id 
                && p.DomainId == category.DomainId).FirstOrDefault();
                if (obj == null)
                {
                    throw new Exception("entity canot be found");
                }

                obj.Discription = category.Discription;
                obj.Name = category.Name;
                obj.Enable = category.Enable;
                obj.Image = category.Image;
                obj.Seo = category.Seo;
                obj.Parent = category.Parent;
                dba.SaveChanges();
                return ResponseMessage.Success();
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }

        public ActionDetails ReadCategories(string domainId) {

            try
            {
                var x = from o in dba.Categories
                        where o.DomainId == domainId
                        select new { id = o.Category_Id, name = o.Name };

                var list = new List<FillDropDownBo>();
                list.Add(new FillDropDownBo
                {

                    Text = "None",
                    Value = "-1"
                });
                foreach (var item in x)
                {
                    list.Add(new FillDropDownBo
                    {
                         Value = item.id,
                         Text = item.name
                    });
                }
                return ResponseMessage.Success(list);
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }
    }
}
