namespace App.Poco
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("CategoriesSort")]
    public partial class CategoriesSort
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Key]
        [Column(Order = 0)]
        [StringLength(100)]
        public string DomainId { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(100)]
        public string CategoryId { get; set; }

        public int? SortOrder { get; set; }

        public virtual Category Category { get; set; }

        public virtual UserDomain UserDomain { get; set; }
    }
}
