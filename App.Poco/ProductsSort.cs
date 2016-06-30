namespace App.Poco
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ProductsSort")]
    public partial class ProductsSort
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Key]
        [Column(Order = 0)]
        [StringLength(100)]
        public string ProductId { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(100)]
        public string DomainId { get; set; }

        public int? SortOrder { get; set; }

        public virtual Product Product { get; set; }

        public virtual UserDomain UserDomain { get; set; }
    }
}
