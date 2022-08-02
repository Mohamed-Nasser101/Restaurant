using Microsoft.EntityFrameworkCore;
using Restaurant.Data;

namespace Restaurant.Extensions;

public static class DataMigrationExtension
{
    public static async Task MigrateAndSeedDatabase(this WebApplication app)
    {
        try
        {
            var services = app.Services.CreateScope().ServiceProvider;
            await using var context = services.GetRequiredService<ApplicationContext>();
            await context.Database.MigrateAsync();
        }
        catch
        {
            Console.WriteLine("Error Migrating the DataBase");
        }
    }
}