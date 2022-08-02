using Microsoft.EntityFrameworkCore;
using Restaurant.Data.Entities;

namespace Restaurant.Data;

public class ApplicationContext : DbContext
{
    public ApplicationContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Branch>()
            .Property(b => b.Title)
            .HasMaxLength(200);

        modelBuilder.Entity<Branch>()
            .Property(b => b.ManagerName)
            .HasMaxLength(250);

        modelBuilder.Entity<Booking>()
            .Property(x => x.ClientName)
            .HasMaxLength(255);
    }

    public DbSet<Branch> Branches { get; set; }
    public DbSet<Booking> Bookings { get; set; }
}