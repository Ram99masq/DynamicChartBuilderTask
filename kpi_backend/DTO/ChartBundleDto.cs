using kpi_backend.Models;

namespace kpi_backend.DTO
{
    public class ChartBundleDto
    {
        public List<ChartDataDto> CloseCalls { get; set; } = new();
        public List<ChartDataDto> Overspeeding { get; set; } = new();
        public List<ChartDataDto> VestViolations { get; set; } = new();
        public List<ChartDataDto> DwellTime { get; set; } = new();
        public List<ChartDataDto> RiskyAreas { get; set; } = new();
        public List<Detection> KPIData { get; set; } = new();
    }

}
