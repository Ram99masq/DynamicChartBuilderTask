namespace kpi_backend.Models
{
    public class ChartQueryParams
    {
        public string KPIType { get; set; }
        public string MetricType { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Class { get; set; }
        public string Zone { get; set; }
        public string? AssetId { get; set; } =null;
        public int? Vest { get; set; }
        public double? SpeedMin { get; set; }
        public double? SpeedMax { get; set; }
        public double? HeadingMin { get; set; }
        public double? HeadingMax { get; set; }
        public int? GroupByTime { get; set; }
        public int? GroupByClass { get; set; }
        public int? GroupByZone { get; set; }
        public int? GroupByAsset { get; set; }
        public int? BucketIntervalMinutes { get; set; }
        public int? TopN { get; set; }
    }

}
