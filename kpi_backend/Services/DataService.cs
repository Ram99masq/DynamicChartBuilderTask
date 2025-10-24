using CsvHelper;
using kpi_backend.Data;
using kpi_backend.DTO;
using kpi_backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
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
            //    using var reader = new StreamReader(file.OpenReadStream());
            //    using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
            //    var records = csv.GetRecords<Detection>().ToList();

            //    var existingIds = await _context.Detections
            //        .Select(d => d.Id)
            //        .ToListAsync();

            //    var duplicates = records
            //        .Where(r => existingIds.Contains(r.Id, StringComparer.OrdinalIgnoreCase))
            //        .Select(r => r.Id)
            //        .Distinct()
            //        .ToList();

            //    if (duplicates.Any())
            //    {
            //        var duplicateList = string.Join(", ", duplicates);
            //        throw new Exception($"Duplicate ID(s) found in database: {duplicateList}");
            //    }

            //    _context.Detections.AddRange(records);
            //    await _context.SaveChangesAsync();
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

                    // Find duplicates in the incoming CSV
                    var duplicates = records.Where(r => existingIds.Contains(r.Id)).ToList();

                    if (duplicates.Any())
                    {
                        var duplicateIds = string.Join(", ", duplicates.Select(d => d.Id));
                        throw new Exception($"Duplicate ID(s) found in database or CSV data: {duplicateIds}");
                    }
                    _context.Detections.AddRange(records);
                }

                await _context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<Detection>> ComputeKPIAsync(KPIRequest request)
        {
            //Linq code starts
            //var query = _context.Detections.AsQueryable();

            //// Apply filters
            //var f = request.Filters;
            //if (f != null)
            //{
            //    if (f.Class?.Any() == true)
            //        query = query.Where(d => f.Class.Contains(d.Class));

            //    if (f.Zone?.Any() == true)
            //        query = query.Where(d => f.Zone.Contains(d.Zone));

            //    if (f.Vest != null)
            //        query = query.Where(d => d.Vest == f.Vest);

            //    if (f.Speed?.Min.HasValue == true)
            //        query = query.Where(d => d.Speed >= f.Speed.Min.Value);

            //    if (f.Speed?.Max.HasValue == true)
            //        query = query.Where(d => d.Speed <= f.Speed.Max.Value);

            //    if (f.Heading?.Min.HasValue == true && f.Heading.Max.HasValue == true)
            //        query = query.Where(d => d.Heading >= f.Heading.Min.Value && d.Heading <= f.Heading.Max.Value);

            //    if (f.TimeRange?.Start != null)
            //        query = query.Where(d => d.Timestamp >= f.TimeRange.Start);

            //    if (f.TimeRange?.End != null)
            //        query = query.Where(d => d.Timestamp <= f.TimeRange.End);
            //}

            //// Grouping keys
            //bool groupByTime = request.GroupBy?.Contains("timestamp_bucket") == true;
            //bool groupByClass = request.GroupBy?.Contains("class") == true;
            //bool groupByZone = request.GroupBy?.Contains("zone") == true;
            //bool groupById = request.GroupBy?.Contains("id") == true;

            //var grouped = query
            //     .AsEnumerable() // ✅ Forces client-side evaluation for GroupBy
            //     .GroupBy(d => new
            //     {
            //         TimeBucket = groupByTime
            //             ? (DateTime?)new DateTime(
            //                 d.Timestamp.Year,
            //                 d.Timestamp.Month,
            //                 d.Timestamp.Day,
            //                 d.Timestamp.Hour,
            //                 (d.Timestamp.Minute / (request.BucketIntervalMinutes ?? 5)) * (request.BucketIntervalMinutes ?? 5),
            //                 0)
            //             : null, // ✅ Cast ensures both branches return DateTime?
            //         Class = groupByClass ? d.Class : null,
            //         Zone = groupByZone ? d.Zone : null,
            //         Id = groupById ? d.Id : null
            //     });


            //var result = grouped
            //    .AsEnumerable()
            //    .Select(g => new KPIResult
            //    {
            //        TimeBucket = g.Key.TimeBucket,
            //        Class = g.Key.Class,
            //        Zone = g.Key.Zone,
            //        Id = g.Key.Id,
            //        Value = request.Metric switch
            //        {
            //            "count" => g.Count(),
            //            "unique_ids" => g.Select(x => x.Id).Distinct().Count(),
            //            "rate_per_hour" => g.Count() / Math.Max(1, (g.Max(x => x.Timestamp) - g.Min(x => x.Timestamp)).TotalHours),
            //            "avg_speed" => g.Average(x => x.Speed),
            //            "vest_compliance" => g.Average(x => (double)x.Vest),
            //            _ => 0
            //        }
            //    })
            //    .ToList();

            //return result;
            //End linq code
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
                      ,[EventType],");

                // Metric logic
                sqlBuilder.AppendLine(metric switch
                {
                    "count" => " CAST(COUNT(*)  AS INT) AS [Count]",
                    "unique_ids" => " CAST(COUNT(DISTINCT id) AS INT) AS [Count]",
                    "avg_speed" => "CAST(AVG(speed) AS INT) AS [Count]",
                    "rate_per_hour" => $"CAST( COUNT(*) / ({bucket} / 60.0) AS INT) AS [Count]",
                    "vest_compliance" => "CAST(COUNT(*) AS INT) FILTER (WHERE class = 'human' AND vest = 0) AS [Count]",
                    "overspeed" => "CAST(COUNT(*) AS INT) FILTER (WHERE speed > 1.5) AS [Count]",
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

                sqlBuilder.AppendLine(@$"GROUP BY DATEADD(MINUTE, (DATEDIFF(MINUTE, 0, timestamp) / {bucket}) * {bucket}, 0) ,  [Id]
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
