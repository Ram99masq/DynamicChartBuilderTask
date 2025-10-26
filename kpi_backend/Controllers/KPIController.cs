
namespace kpi_backend.Controllers
{
    using kpi_backend.DTO;
    using kpi_backend.Services;
    using Microsoft.AspNetCore.Mvc;
    using System.Text.Json;

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
            try
            {
                await _dataService.ProcessCsvAsync(file);
                return Ok(new { message = "CSV uploaded successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }


        [HttpPost("compute")]
        public async Task<IActionResult> ComputeKPI([FromBody] KPIRequest request)
        {
            if (request.Filters?.TimeRange == null)
                return BadRequest("Time range is required.");
            try
            {
                var result = await _dataService.ComputeKPIAsync(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("presets")]
        public async Task<IActionResult> SavePreset([FromBody] KPIRequest request, string name)
        {
            try
            {
                await _dataService.SavePresetAsync(request, name);
                return Ok(new { message = "Preset saved successfully." });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Internal server error", details = ex.Message });
            }
        }

        [HttpGet("presets")]
        public IActionResult GetPresets()
        {
            try
            {
                var presets = _dataService.GetPresets();
                return Ok(presets);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }


}
