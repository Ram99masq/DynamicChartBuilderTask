using kpi_backend.DTO;
using kpi_backend.Models;

namespace kpi_backend.Services
{
    public interface IDataService
    {
        Task ProcessCsvAsync(IFormFile file);
        List<Dictionary<string, object>> ComputeKPI(KPIRequest request);
        void SavePreset(KPIRequest request);
        List<KPIPreset> GetPresets();
    }

}
