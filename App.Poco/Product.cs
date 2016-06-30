namespace App.Poco
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Product
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Product()
        {
            ProductsImages = new HashSet<ProductsImage>();
            ProductsSorts = new HashSet<ProductsSort>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [StringLength(100)]
        public string ProductId { get; set; }

        [StringLength(100)]
        public string DomainId { get; set; }

        public string Discription { get; set; }

        public string Seo { get; set; }

        public bool? Enable { get; set; }

        [StringLength(100)]
        public string BrandId { get; set; }

        [StringLength(500)]
        public string Price { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        public virtual UserDomain UserDomain { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProductsImage> ProductsImages { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProductsSort> ProductsSorts { get; set; }
    }
}
