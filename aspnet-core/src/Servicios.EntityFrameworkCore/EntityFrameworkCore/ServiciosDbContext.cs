using Microsoft.EntityFrameworkCore;
using Servicios.Domain.Hamburguesa;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.TenantManagement;
using Volo.Abp.TenantManagement.EntityFrameworkCore;

namespace Servicios.EntityFrameworkCore;

[ReplaceDbContext(typeof(IIdentityDbContext))]
[ReplaceDbContext(typeof(ITenantManagementDbContext))]
[ConnectionStringName("Default")]
public class ServiciosDbContext :
    AbpDbContext<ServiciosDbContext>,
    IIdentityDbContext,
    ITenantManagementDbContext
{
    /* Add DbSet properties for your Aggregate Roots / Entities here. */

    #region Entities from the modules

    /* Notice: We only implemented IIdentityDbContext and ITenantManagementDbContext
     * and replaced them for this DbContext. This allows you to perform JOIN
     * queries for the entities of these modules over the repositories easily. You
     * typically don't need that for other modules. But, if you need, you can
     * implement the DbContext interface of the needed module and use ReplaceDbContext
     * attribute just like IIdentityDbContext and ITenantManagementDbContext.
     *
     * More info: Replacing a DbContext of a module ensures that the related module
     * uses this DbContext on runtime. Otherwise, it will use its own DbContext class.
     */

    //Identity
    public DbSet<IdentityUser> Users { get; set; }
    public DbSet<IdentityRole> Roles { get; set; }
    public DbSet<IdentityClaimType> ClaimTypes { get; set; }
    public DbSet<OrganizationUnit> OrganizationUnits { get; set; }
    public DbSet<IdentitySecurityLog> SecurityLogs { get; set; }
    public DbSet<IdentityLinkUser> LinkUsers { get; set; }
    public DbSet<IdentityUserDelegation> UserDelegations { get; set; }
    public DbSet<IdentitySession> Sessions { get; set; }
    // Tenant Management
    public DbSet<Tenant> Tenants { get; set; }
    public DbSet<TenantConnectionString> TenantConnectionStrings { get; set; }
    public DbSet<Hamburguesas> Hamburguesas { get; set; }
    public DbSet<Pedido> Pedido { get; set; }

    public DbSet<PedidoItems> PedidoItems{ get; set; }

    public DbSet<Ingrendientes> Ingredientes { get; set; }


    #endregion

    public ServiciosDbContext(DbContextOptions<ServiciosDbContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        /* Include modules to your migration db context */

        builder.ConfigurePermissionManagement();
        builder.ConfigureSettingManagement();
        builder.ConfigureBackgroundJobs();
        builder.ConfigureAuditLogging();
        builder.ConfigureIdentity();
        builder.ConfigureOpenIddict();
        builder.ConfigureFeatureManagement();
        builder.ConfigureTenantManagement();

        /* Configure your own tables/entities inside here */

        //builder.Entity<YourEntity>(b =>
        //{
        //    b.ToTable(ServiciosConsts.DbTablePrefix + "YourEntities", ServiciosConsts.DbSchema);
        //    b.ConfigureByConvention(); //auto configure for the base class props
        //    //...
        //});

        builder.Entity<Hamburguesas>(b =>
        {
            b.ToTable(ServiciosConsts.DbTablePrefix + "Hamburguesas", ServiciosConsts.DbSchema);
            b.ConfigureByConvention();
            b.Property(x => x.Nombre).IsRequired().HasMaxLength(128);
            b.Property(x => x.Precio).IsRequired().HasColumnType("decimal(18,2)");
            b.Property(x => x.ImagenUrl).HasMaxLength(256);
            b.HasMany(x => x.ListaIngredientes).WithOne().IsRequired();
            b.Property(x => x.FechaCreacion).IsRequired();
            b.Property(x => x.FechaModificacion);
        });

        builder.Entity<Pedido>(b =>
        {
            b.ToTable(ServiciosConsts.DbTablePrefix + "Pedidos", ServiciosConsts.DbSchema);
            b.ConfigureByConvention();
            b.Property(x => x.ClienteNombre).IsRequired().HasMaxLength(128);
            b.Property(x => x.ClienteTelefono).IsRequired().HasMaxLength(32);
            b.Property(x => x.ClienteEmail).HasMaxLength(128);
            b.Property(x => x.Calle).IsRequired().HasMaxLength(256);
            b.Property(x => x.Piso).HasMaxLength(32);
            b.Property(x => x.Comentario).HasMaxLength(512);

            b.Property(x => x.FormaPago).IsRequired().HasMaxLength(64);
            b.Property(x => x.Total).IsRequired().HasColumnType("decimal(18,2)");

            b.HasMany(p => p.Items)
            .WithOne(i => i.Pedido)
            .HasForeignKey(i => i.PedidoId);
        });

        builder.Entity<PedidoItems>(b =>
        {
            b.ToTable(ServiciosConsts.DbTablePrefix + "PedidoItems", ServiciosConsts.DbSchema);
            b.ConfigureByConvention();

            b.Property(x => x.Cantidad).IsRequired();
            b.Property(x => x.PrecioUnitario).IsRequired().HasColumnType("decimal(18,2)");

            // Relación con Pedido
            b.HasOne(i => i.Pedido)
            .WithMany(p => p.Items)
            .HasForeignKey(i => i.PedidoId);

            // Relación con Hamburguesa
            b.HasOne(i => i.Hamburguesa)
            .WithMany()
            .HasForeignKey(i => i.HamburguesaId);
        });

        builder.Entity<Ingrendientes>(a =>
        {
            a.ToTable(ServiciosConsts.DbTablePrefix + "Ingredientes", ServiciosConsts.DbSchema);
            a.ConfigureByConvention();
            a.Property(y => y.Nombre).IsRequired().HasMaxLength(100);
            a.Property(y => y.Cantidad).IsRequired();
        });
        
    }
}
