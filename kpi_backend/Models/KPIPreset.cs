namespace kpi_backend.Models
{
    public class KPIPreset
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Metric { get; set; }
        public string Filters { get; set; }
        public string GroupBy { get; set; }
        public string ChartType { get; set; }
    }

}
