namespace App.Poco
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ImageSlider")]
    public partial class ImageSlider
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Key]
        [StringLength(50)]
        public string DomainId { get; set; }

        [StringLength(50)]
        public string Image { get; set; }

        public bool? Enable { get; set; }
    }
}
