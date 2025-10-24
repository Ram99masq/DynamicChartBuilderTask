
using kpi_backend.DTO;
using kpi_backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
namespace kpi_backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Detection> Detections { get; set; }
        public DbSet<KPIPreset> KPIPresets { get; set; }

    }
}
