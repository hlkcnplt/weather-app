using Microsoft.AspNetCore.Mvc;
using WeatherBackend.Services;

namespace WeatherBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherController : ControllerBase
{
    private readonly IWeatherService _weatherService;

    public WeatherController(IWeatherService weatherService)
    {
        _weatherService = weatherService;
    }

    [HttpGet("{city}")]
    public async Task<IActionResult> GetWeather(string city)
    {
        if (string.IsNullOrWhiteSpace(city))
        {
            return BadRequest(new { error = "City parameter required" });
        }

        var result = await _weatherService.GetWeatherForCityAsync(city);

        if (result.Error != null)
        {
            return StatusCode(result.StatusCode, new { error = result.Error });
        }

        return Ok(new { source = result.Source, data = result.Data });
    }
}
