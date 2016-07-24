using App.Bo;
using App.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
namespace App.DbService
{
    public interface IImageSlider {

        ActionDetails InsertImage(string domainId,string image, bool enable);
        ActionDetails ReadImage(string domainId);
        ActionDetails DeleteImage(string domainId, string Image);
        ActionDetails OrderImages(string domaindId, List<string> Images);
    }

    public class ImageSlider : BaseService, IImageSlider
    {
        public ActionDetails DeleteImage(string domainId, string Image)
        {
            try
            {
                dba.ImageSliders.RemoveRange(dba.ImageSliders.Where(p => p.DomainId == domainId && p.Image == Image));
                dba.ImageSliderOrders.RemoveRange(dba.ImageSliderOrders.Where(p => p.DomainId == domainId && p.ImageId == Image));
                dba.SaveChanges();
                return ResponseMessage.Success();
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }
 
        public ActionDetails InsertImage(string domainId, string image,bool enable)
        {
            try
            {
                try
                {
                    dba.ImageSliders.Add(new Poco.ImageSlider {
                         DomainId = domainId,
                         Image = image,
                         Enable = enable
                    });
                    dba.ImageSliderOrders.Add(new Poco.ImageSliderOrder {
                         DomainId = domainId,
                         ImageId = image
                    });
                    dba.SaveChanges();
                    return ResponseMessage.Success();
                }
                catch (Exception ex)
                {
                    return ResponseMessage.Error(ex);
                }
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }

        public ActionDetails OrderImages(string domaindId, List<string> Images)
        {
            try
            {
                // remove current order
                dba.ImageSliderOrders.RemoveRange(dba.ImageSliderOrders.Where(p => p.DomainId == domaindId));
                dba.SaveChanges();
                // insert
                foreach (var item in Images)
                {
                    dba.ImageSliderOrders.Add(new Poco.ImageSliderOrder
                    {
                        DomainId = domaindId,
                        ImageId = item
                    });
                }
                dba.SaveChanges();
                return ResponseMessage.Success();
            }
            catch (Exception ex)
            {
                return ResponseMessage.Error(ex);
            }
        }

        public ActionDetails ReadImage(string domainId)
        {
            try
            {

                var xx = from item in dba.ImageSliders
                         join pg in dba.ImageSliderOrders on item.Image equals pg.ImageId
                         where item.DomainId == domainId
                         orderby pg.Id ascending
                         select new { image = item.Image };

                var x = dba.ImageSliderOrders.Where(p => p.DomainId == domainId).ToList();
                var y = dba.ImageSliders.Where(p=>p.DomainId==domainId).ToList();
                var list = new List<ImageSliderBo>();
                Mapper.CreateMap<Poco.ImageSlider, ImageSliderBo>();
                foreach (var item in xx)
                {
                    list.Add(new ImageSliderBo
                    {
                        DomainId = domainId,
                        Enable = true,
                        Image = item.image
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
