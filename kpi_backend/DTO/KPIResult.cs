namespace kpi_backend.DTO
{
    public class KPIResult
    {
        public DateTime? TimeBucket { get; set; }
        public string? Class { get; set; }
        public string? Zone { get; set; }
        public string? Id { get; set; }
        public double Value { get; set; }
    }

}
