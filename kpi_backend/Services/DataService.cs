namespace kpi_backend.Services
{
    using CsvHelper;
    using kpi_backend.Data;
    using kpi_backend.DTO;
    using kpi_backend.Models;
    using Microsoft.Extensions.Options;
    using System.Formats.Asn1;
    using System.Globalization;
    using System.Text.Json;

    public class DataService : IDataService
    {
        private readonly AppDbContext _context;

        public DataService(AppDbContext context)
        {
            _context = context;
        }

        public async Task ProcessCsvAsync(IFormFile file)
        {
            using var reader = new StreamReader(file.OpenReadStream());
            using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
            var records = csv.GetRecords<Detection>().ToList();
            _context.Detections.AddRange(records);
            await _context.SaveChangesAsync();
        }

        public List<Dictionary<string, object>> ComputeKPI(KPIRequest request)
        {
            var query = _context.Detections.AsQueryable();

            if (request.Filters != null)
            {
                var f = request.Filters;
                if (f.ContainsKey("eventType"))
                    query = query.Where(d => d.EventType == f["eventType"].ToString());
                if (f.ContainsKey("class"))
                    //query = query.Where(d => f["class"].ToString().Split(',').Contains(d.Class));
                query = query.Where(d => ("," + f["class"] + ",").Contains("," + d.Class + ","));

            }



            var data = query.ToList();
            var result = new List<Dictionary<string, object>>();

            if (request.GroupBy != null && request.GroupBy.Any())
            {
                var groupKey = request.GroupBy.First();
                var grouped = data.GroupBy(d => d.GetType().GetProperty(groupKey)?.GetValue(d, null));

                foreach (var group in grouped)
                {
                    result.Add(new Dictionary<string, object>
                {
                    { group.Key?.ToString() ?? "Total", group.Count() }
                });
                }
            }
            else
            {
                result.Add(new Dictionary<string, object> { { "Total", data.Count } });
            }

            return result;
        }

        public void SavePreset(KPIRequest request)
        {
            var preset = new KPIPreset
            {
                Name = request.Name ?? "Unnamed Preset",
                Metric = request.Metric,
                Filters = JsonSerializer.Serialize(request.Filters),
                GroupBy = JsonSerializer.Serialize(request.GroupBy),
                ChartType = request.ChartType
            };
            _context.KPIPresets.Add(preset);
            _context.SaveChanges();
        }

        public List<KPIPreset> GetPresets()
        {
            return _context.KPIPresets.ToList();
        }
    }

}
