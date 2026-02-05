using System.Text.Json.Nodes;

namespace WeatherBackend.Services;

public interface IWeatherService
{
    Task<ServiceResult> GetWeatherForCityAsync(string city);
}

public class ServiceResult
{
    public string Source { get; set; } = string.Empty;
    public JsonNode? Data { get; set; }
    public string? Error { get; set; }
    public int StatusCode { get; set; } = 200;
}
