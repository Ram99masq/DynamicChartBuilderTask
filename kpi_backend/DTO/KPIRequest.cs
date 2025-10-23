namespace kpi_backend.DTO
{
    public class KPIRequest
    {
        public string Metric { get; set; }
        public Dictionary<string, object> Filters { get; set; }
        public List<string> GroupBy { get; set; }
        public string ChartType { get; set; }
        public string Name { get; set; }
    }

}
