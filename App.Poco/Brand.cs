namespace App.Poco
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Brand
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [StringLength(100)]
        public string BrandId { get; set; }

        [StringLength(100)]
        public string DomainId { get; set; }

        [StringLength(500)]
        public string BrandName { get; set; }

        public string BrandDiscription { get; set; }

        public string Seo { get; set; }

        [StringLength(100)]
        public string Image { get; set; }

        public bool? Enable { get; set; }

        public virtual UserDomain UserDomain { get; set; }
    }
}
