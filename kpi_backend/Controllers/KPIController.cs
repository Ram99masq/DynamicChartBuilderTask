
namespace kpi_backend.Controllers
{
    using kpi_backend.DTO;
    using kpi_backend.Services;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("api/kpi")]
    public class KPIController : ControllerBase
    {
        private readonly IDataService _dataService;

        public KPIController(IDataService dataService)
        {
            _dataService = dataService;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadCSV(IFormFile file)
        {
            await _dataService.ProcessCsvAsync(file);
            return Ok(new { message = "CSV uploaded successfully." });
        }

        [HttpPost("compute")]
        public IActionResult ComputeKPI([FromBody] KPIRequest request)
        {
            var result = _dataService.ComputeKPI(request);
            return Ok(result);
        }

        [HttpPost("presets")]
        public IActionResult SavePreset([FromBody] KPIRequest request)
        {
            _dataService.SavePreset(request);
            return Ok(new { message = "Preset saved." });
        }

        [HttpGet("presets")]
        public IActionResult GetPresets()
        {
            var presets = _dataService.GetPresets();
            return Ok(presets);
        }
    }

}
