namespace App.Poco
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ProductsImage
    {
        public int Id { get; set; }

        [StringLength(100)]
        public string ProductId { get; set; }

        [StringLength(100)]
        public string DomainId { get; set; }

        [StringLength(100)]
        public string ImagePath { get; set; }

        public bool? IsDefault { get; set; }

        public virtual Product Product { get; set; }

        public virtual UserDomain UserDomain { get; set; }
    }
}
