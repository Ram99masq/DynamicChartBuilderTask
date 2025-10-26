using CsvHelper;
using kpi_backend.Common;
using kpi_backend.Data;
using kpi_backend.DTO;
using kpi_backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Runtime.Intrinsics.X86;
using System.Text;
using System.Text.Json;

namespace kpi_backend.Services
{
    public class DataService : IDataService
    {
        private readonly AppDbContext _context;

        public DataService(AppDbContext context)
        {
            _context = context;
        }

        public async Task ProcessCsvAsync(IFormFile file)
        {
            try
            {
                using (var reader = new StreamReader(file.OpenReadStream()))
                using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                {
                    csv.Context.RegisterClassMap<DetectionMap>();
                    var records = csv.GetRecords<Detection>().ToList();

                    // Get all existing IDs from the database
                    var existingIds = _context.Detections
                        .Select(d => d.Id)
                        .ToHashSet(StringComparer.OrdinalIgnoreCase);
                
                    _context.Detections.AddRange(records);
                }

                await _context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<Detection>> ComputeKPIDatatableAsync(KPIRequest request)
        {

            var results = new List<Detection>();

            try
            {
                var metric = request.Metric.ToLower();
                var bucket = request.BucketIntervalMinutes ?? 5;

                var sqlBuilder = new StringBuilder();
                sqlBuilder.AppendLine("SELECT");

                // Grouping columns
                sqlBuilder.AppendLine(request.GroupBy.Contains("timestamp_bucket")
                    ? $"DATEADD(MINUTE, (DATEDIFF(MINUTE, 0, timestamp) / {bucket}) * {bucket}, 0) AS TimeBucket,"
                    : "NULL AS TimeBucket,");
                sqlBuilder.AppendLine(@"[Id]
                      ,[Class]
                      ,[X]
                      ,[Y]
                      ,[Timestamp]
                      ,[Speed]
                      ,[Heading]
                      ,CAST([Vest] AS INT) AS [Vest]
                      ,[Zone]
                      ,[EventType],[RowId],");

                // Metric logic Mapping

                //Metric  SQL Expression
                //count CAST(COUNT(*) AS INT) AS[Count]
                //unique_ids CAST(COUNT(DISTINCT id) AS INT) AS[Count]
                //avg_speed CAST(AVG(speed) AS INT) AS[Count]
                //rate_per_hour CAST(COUNT(*) / (bucket / 60.0) AS INT) AS[Count]
                //vest_compliance CAST(COUNT(*) FILTER (WHERE class = 'human' AND vest = 0) AS[Count]
                //overspeed   CAST(COUNT(*) FILTER (WHERE speed > 1.5) AS[Count]

                sqlBuilder.AppendLine(metric switch
                {
                    "count" => " CAST(COUNT(*)  AS INT) AS [Count]",//count
                    "unique_ids" => " CAST(COUNT(DISTINCT id) AS INT) AS [Count]",//unique_ids
                    "avg_speed" => "CAST(AVG(speed) AS INT) AS [Count]",//avg_speed
                    "rate_per_hour" => $"CAST( COUNT(*) / ({bucket} / 60.0) AS INT) AS [Count]",//rate_per_hour
                    "vest_compliance" => "CAST(COUNT(*) AS INT) FILTER (WHERE class = 'human' AND vest = 0) AS [Count]",//vest_compliance
                    "overspeed" => "CAST(COUNT(*) AS INT) FILTER (WHERE speed > 1.5) AS [Count]",//overspeed
                    _ => "0 AS [Count]"
                });

                sqlBuilder.AppendLine("FROM Detections");
                sqlBuilder.AppendLine($"WHERE timestamp BETWEEN '{request.Filters.TimeRange.Start}' AND '{request.Filters.TimeRange.End}'");

                // Optional filters
                if (request.Filters.Class?.Any() == true)
                {
                    var classValues = string.Join(",", request.Filters.Class.Select(c => $"'{c}'"));
                    sqlBuilder.AppendLine($"AND class IN ({classValues})");
                }

                if (request.Filters.Zone?.Any() == true)
                {
                    var zoneValues = string.Join(",", request.Filters.Zone.Select(z => $"'{z}'"));
                    sqlBuilder.AppendLine($"AND zone IN ({zoneValues})");
                }

                if (request.Filters.Vest != null)
                {
                    sqlBuilder.AppendLine($"AND vest = {request.Filters.Vest.Value}");
                }

                if (request.Filters.Speed?.Min != null)
                {
                    sqlBuilder.AppendLine($"AND speed >= {request.Filters.Speed.Min.Value}");
                }

                if (request.Filters.Speed?.Max != null)
                {
                    sqlBuilder.AppendLine($"AND speed <= {request.Filters.Speed.Max.Value}");
                }

                if (request.Filters.Heading?.Min != null && request.Filters.Heading?.Max != null)
                {
                    sqlBuilder.AppendLine($"AND heading BETWEEN {request.Filters.Heading.Min.Value} AND {request.Filters.Heading.Max.Value}");
                }

                sqlBuilder.AppendLine(@$"GROUP BY DATEADD(MINUTE, (DATEDIFF(MINUTE, 0, timestamp) / {bucket}) * {bucket}, 0),[RowId] ,  [Id]
                          ,[Class]
	                      ,[Zone]
                          ,[X]
                          ,[Y]
                          ,[Timestamp]
                          ,[Speed]
                          ,[Heading]
                          ,[Vest]
                          ,[EventType] ");

                var sql = sqlBuilder.ToString();

                results = await _context.Detections
                    .FromSqlRaw(sql)
                    .ToListAsync();

                return results;
            }
            catch (Exception ex)
            {
                // Log error if needed
                return new List<Detection> {
            new Detection {
                EventType = "",
                Class = "error",
                Zone = "",
                Id = ""
                }
            };
            }
        }

        public async Task<ChartBundleDto> ComputeKPIAsync(KPIRequest request)
        {
            var bundle = new ChartBundleDto();

            bundle.CloseCalls = await _context.GetChartDataAsync(request.ToChartQueryParams("CloseCalls"));
            bundle.Overspeeding = await _context.GetChartDataAsync(request.ToChartQueryParams("Overspeeding"));
            bundle.VestViolations = await _context.GetChartDataAsync(request.ToChartQueryParams("VestViolations"));
            bundle.DwellTime = await _context.GetChartDataAsync(request.ToChartQueryParams("DwellTime"));
            bundle.RiskyAreas = await _context.GetChartDataAsync(request.ToChartQueryParams("RiskyAreas"));
            bundle.KPIData = await ComputeKPIDatatableAsync(request);

            return bundle;
        }



        public async Task SavePresetAsync(KPIRequest request, string name)
        {

            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentException("Preset name is required.");
            }
            var jsonString = JsonSerializer.Serialize(request);
            var preset = new KPIPreset
            {
                Name = name,
                JsonPayload = jsonString,
                CreatedAt = DateTime.Now
            };

            _context.KPIPresets.Add(preset);
            await _context.SaveChangesAsync();
        }

        public List<KPIPreset> GetPresets()
        {
            return _context.KPIPresets.ToList();
        }
    }
}
