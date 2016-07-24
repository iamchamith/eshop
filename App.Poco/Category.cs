namespace App.Poco
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Category
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Category()
        {
            CategoriesSorts = new HashSet<CategoriesSort>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Key]
        [StringLength(100)]
        public string Category_Id { get; set; }

        [Required]
        [StringLength(100)]
        public string DomainId { get; set; }

        [StringLength(500)]
        public string Name { get; set; }

        public string Discription { get; set; }

        public string Seo { get; set; }

        [StringLength(50)]
        public string Image { get; set; }

        [StringLength(50)]
        public string Parent { get; set; }

        public bool? Enable { get; set; }

        public virtual UserDomain UserDomain { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CategoriesSort> CategoriesSorts { get; set; }
    }
}
