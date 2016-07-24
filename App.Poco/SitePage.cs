namespace App.Poco
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class SitePage
    {
        public int Id { get; set; }

        [StringLength(50)]
        public string DomainId { get; set; }

        public int? PageType { get; set; }

        public string ContentInfo { get; set; }
    }
}
