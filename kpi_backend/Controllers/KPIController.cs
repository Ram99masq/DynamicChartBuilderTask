
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
        public IActionResult SavePreset([FromBody] KPIRequest request)
        {
            try
            {
                _dataService.SavePreset(request);
                return Ok(new { message = "Preset saved successfully." });
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("already exists"))
                    return Conflict(new { error = ex.Message });
                return BadRequest(new { error = ex.Message });
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
