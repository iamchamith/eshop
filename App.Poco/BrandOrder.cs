namespace App.Poco
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("BrandOrder")]
    public partial class BrandOrder
    {
        public int Id { get; set; }

        [StringLength(100)]
        public string BrandId { get; set; }

        [StringLength(100)]
        public string DomainId { get; set; }

        public int? Order_ { get; set; }
    }
}
