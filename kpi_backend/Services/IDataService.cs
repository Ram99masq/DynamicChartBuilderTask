using kpi_backend.DTO;
using kpi_backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace kpi_backend.Services
{
    public interface IDataService
    {
        /// <summary>
        /// Processes a CSV file and inserts valid detections into the database.
        /// Throws an exception if duplicate IDs are found.
        /// </summary>
        Task ProcessCsvAsync(IFormFile file);

        /// <summary>
        /// Computes KPI results based on the provided request.
        /// </summary>
        Task<List<Detection>> ComputeKPIAsync(KPIRequest request);



        /// <summary>
        /// Saves a KPI preset to the database.
        /// Throws an exception if the name already exists or required fields are missing.
        /// </summary>
        Task SavePresetAsync(KPIRequest request, string name);


        /// <summary>
        /// Retrieves all saved KPI presets.
        /// </summary>
        List<KPIPreset> GetPresets();
    }
}
