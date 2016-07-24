namespace App.DBAccess
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using Poco;

    public partial class Dbase : DbContext
    {
        public Dbase()
            : base(@"Data Source=DELL\SQLEXPRESS;Initial Catalog=ECART;Integrated Security=True")
        {
        }

        public virtual DbSet<BrandOrder> BrandOrders { get; set; }
        public virtual DbSet<Brand> Brands { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<CategoriesSort> CategoriesSorts { get; set; }
        public virtual DbSet<ImageSlider> ImageSliders { get; set; }
        public virtual DbSet<ImageSliderOrder> ImageSliderOrders { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductsCategory> ProductsCategories { get; set; }
        public virtual DbSet<ProductsImage> ProductsImages { get; set; }
        public virtual DbSet<ProductsSort> ProductsSorts { get; set; }
        public virtual DbSet<SiteGlobleVariable> SiteGlobleVariables { get; set; }
        public virtual DbSet<SitePage> SitePages { get; set; }
        public virtual DbSet<UserDomain> UserDomains { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BrandOrder>()
                .Property(e => e.BrandId)
                .IsUnicode(false);

            modelBuilder.Entity<BrandOrder>()
                .Property(e => e.DomainId)
                .IsUnicode(false);

            modelBuilder.Entity<Brand>()
                .Property(e => e.BrandId)
                .IsUnicode(false);

            modelBuilder.Entity<Brand>()
                .Property(e => e.DomainId)
                .IsUnicode(false);

            modelBuilder.Entity<Brand>()
                .Property(e => e.Image)
                .IsUnicode(false);

            modelBuilder.Entity<Category>()
                .Property(e => e.Category_Id)
                .IsUnicode(false);

            modelBuilder.Entity<Category>()
                .Property(e => e.DomainId)
                .IsUnicode(false);

            modelBuilder.Entity<Category>()
                .Property(e => e.Image)
                .IsUnicode(false);

            modelBuilder.Entity<Category>()
                .Property(e => e.Parent)
                .IsUnicode(false);

            modelBuilder.Entity<Category>()
                .HasMany(e => e.CategoriesSorts)
                .WithRequired(e => e.Category)
                .HasForeignKey(e => e.CategoryId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CategoriesSort>()
                .Property(e => e.DomainId)
                .IsUnicode(false);

            modelBuilder.Entity<CategoriesSort>()
                .Property(e => e.CategoryId)
                .IsUnicode(false);

            modelBuilder.Entity<ImageSlider>()
                .Property(e => e.DomainId)
                .IsUnicode(false);

            modelBuilder.Entity<ImageSlider>()
                .Property(e => e.Image)
                .IsUnicode(false);

            modelBuilder.Entity<ImageSliderOrder>()
                .Property(e => e.DomainId)
                .IsUnicode(false);

            modelBuilder.Entity<Product>()
                .Property(e => e.ProductId)
                .IsUnicode(false);

            modelBuilder.Entity<Product>()
                .Property(e => e.DomainId)
                .IsUnicode(false);

            modelBuilder.Entity<Product>()
                .Property(e => e.BrandId)
                .IsUnicode(false);

            modelBuilder.Entity<Product>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<Product>()
                .HasMany(e => e.ProductsSorts)
                .WithRequired(e => e.Product)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ProductsCategory>()
                .Property(e => e.ProductId)
                .IsUnicode(false);

            modelBuilder.Entity<ProductsCategory>()
                .Property(e => e.CategoryId)
                .IsUnicode(false);

            modelBuilder.Entity<ProductsImage>()
                .Property(e => e.ProductId)
                .IsUnicode(false);

            modelBuilder.Entity<ProductsImage>()
                .Property(e => e.DomainId)
                .IsUnicode(false);

            modelBuilder.Entity<ProductsImage>()
                .Property(e => e.ImagePath)
                .IsUnicode(false);

            modelBuilder.Entity<ProductsSort>()
                .Property(e => e.ProductId)
                .IsUnicode(false);

            modelBuilder.Entity<ProductsSort>()
                .Property(e => e.DomainId)
                .IsUnicode(false);

            modelBuilder.Entity<SiteGlobleVariable>()
                .Property(e => e.DomainId)
                .IsUnicode(false);

            modelBuilder.Entity<SitePage>()
                .Property(e => e.DomainId)
                .IsUnicode(false);

            modelBuilder.Entity<UserDomain>()
                .Property(e => e.UserId)
                .IsUnicode(false);

            modelBuilder.Entity<UserDomain>()
                .Property(e => e.DomainId)
                .IsUnicode(false);

            modelBuilder.Entity<UserDomain>()
                .Property(e => e.Domain)
                .IsUnicode(false);

            modelBuilder.Entity<UserDomain>()
                .HasMany(e => e.Categories)
                .WithRequired(e => e.UserDomain)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<UserDomain>()
                .HasMany(e => e.CategoriesSorts)
                .WithRequired(e => e.UserDomain)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<UserDomain>()
                .HasMany(e => e.ProductsSorts)
                .WithRequired(e => e.UserDomain)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<UserDomain>()
                .HasMany(e => e.SiteGlobleVariables)
                .WithRequired(e => e.UserDomain)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .Property(e => e.Email)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.Password)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.Token)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.UserDomains)
                .WithRequired(e => e.User)
                .HasForeignKey(e => e.UserId)
                .WillCascadeOnDelete(false);
        }
    }
}
