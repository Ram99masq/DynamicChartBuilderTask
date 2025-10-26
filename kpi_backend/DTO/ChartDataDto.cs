namespace kpi_backend.DTO
{
    public class ChartDataDto
    {
        public DateTime? TimeBucket { get; set; }
        public string? Class { get; set; }
        public string? Zone { get; set; }
        public string? AssetId { get; set; }
        public int? Count { get; set; }
        public decimal? RatePerHour { get; set; }
        public int? UniqueViolators { get; set; }
        public DateTime? EntryTime { get; set; }
        public DateTime? ExitTime { get; set; }
        public int? DwellTimeMinutes { get; set; }
        public decimal? NearMissDensity { get; set; }
    }

}
