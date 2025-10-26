
using kpi_backend.DTO;
using kpi_backend.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
namespace kpi_backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Detection> Detections { get; set; }
        public DbSet<KPIPreset> KPIPresets { get; set; }
        public DbSet<ChartDataDto> ChartData { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Detection>()
            .HasKey(d => d.RowId); // ✅ Set RowId as primary key

            modelBuilder.Entity<Detection>()
                .Property(d => d.RowId)
                .ValueGeneratedOnAdd(); // Auto-generate GUID if not supplied

            modelBuilder.Entity<Detection>()
                .Property(d => d.Id)
                .ValueGeneratedNever(); // You supply this manually

            modelBuilder.Entity<ChartDataDto>().HasNoKey(); // This is critical for stored procedure results
            base.OnModelCreating(modelBuilder);
        }

        public async Task<List<ChartDataDto>> GetChartDataAsync(ChartQueryParams query)
        {
            var parameters = new[]
            {
            new SqlParameter("@KPIType", query.KPIType),
            new SqlParameter("@MetricType", query.MetricType),
            new SqlParameter("@StartTime", query.StartTime),
            new SqlParameter("@EndTime", query.EndTime),
            new SqlParameter("@Class", query.Class ?? (object)DBNull.Value),
            new SqlParameter("@Zone", query.Zone ?? (object)DBNull.Value),
            new SqlParameter("@AssetId", query.AssetId ?? (object)DBNull.Value),
            new SqlParameter("@Vest", query.Vest ?? (object)DBNull.Value),
            new SqlParameter("@SpeedMin", query.SpeedMin ?? (object)DBNull.Value),
            new SqlParameter("@SpeedMax", query.SpeedMax ?? (object)DBNull.Value),
            new SqlParameter("@HeadingMin", query.HeadingMin ?? (object)DBNull.Value),
            new SqlParameter("@HeadingMax", query.HeadingMax ?? (object)DBNull.Value),
            new SqlParameter("@GroupByTime", query.GroupByTime ?? (object)DBNull.Value),
            new SqlParameter("@GroupByClass", query.GroupByClass ?? (object)DBNull.Value),
            new SqlParameter("@GroupByZone", query.GroupByZone ?? (object)DBNull.Value),
            new SqlParameter("@GroupByAsset", query.GroupByAsset ?? (object)DBNull.Value),
            new SqlParameter("@BucketIntervalMinutes", query.BucketIntervalMinutes ?? (object)DBNull.Value),
            new SqlParameter("@TopN", query.TopN ?? (object)DBNull.Value)
        };

            return await ChartData
                .FromSqlRaw("EXEC sp_GetChartData @KPIType, @MetricType, @StartTime, @EndTime, @Class, @Zone, @AssetId, @Vest, @SpeedMin, @SpeedMax, @HeadingMin, @HeadingMax, @GroupByTime, @GroupByClass, @GroupByZone, @GroupByAsset, @BucketIntervalMinutes, @TopN", parameters)
                .ToListAsync();
        }
    }
}
