using Microsoft.Extensions.Options;
using StackExchange.Redis;
using System.Text.Json;
using System.Text.Json.Nodes;
using WeatherBackend.Configuration;

namespace WeatherBackend.Services;

public class WeatherService : IWeatherService
{
    private readonly IConnectionMultiplexer _redis;
    private readonly HttpClient _httpClient;
    private readonly WeatherApiSettings _settings;

    public WeatherService(IConnectionMultiplexer redis, HttpClient httpClient, IOptions<WeatherApiSettings> settings)
    {
        _redis = redis;
        _httpClient = httpClient;
        _settings = settings.Value;
    }

    public async Task<ServiceResult> GetWeatherForCityAsync(string city)
    {
        string cacheKey = $"weather:current:{city.ToLower()}";


        if (_redis.IsConnected)
        {
            try
            {
                var db = _redis.GetDatabase();
                var cachedData = await db.StringGetAsync(cacheKey);
                if (!cachedData.IsNullOrEmpty)
                {
                    return new ServiceResult 
                    { 
                        Source = "cache", 
                        Data = JsonSerializer.Deserialize<JsonNode>(cachedData.ToString()) 
                    };
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Redis read error: {ex.Message}");
            }
        }


        try
        {
            var response = await _httpClient.GetAsync($"{_settings.BaseUrl}/forecast.json?key={_settings.ApiKey}&q={city}&days=3");
            
            if (!response.IsSuccessStatusCode)
            {
                return new ServiceResult 
                { 
                    Error = "Could not retrieve weather data.", 
                    StatusCode = 503 
                };
            }

            var content = await response.Content.ReadAsStringAsync();
            var jsonContent = JsonSerializer.Deserialize<JsonNode>(content);


            if (_redis.IsConnected)
            {
                try
                {
                    var db = _redis.GetDatabase();
                    await db.StringSetAsync(cacheKey, content, TimeSpan.FromMinutes(30));
                }
                catch (Exception ex)
                {
                     Console.WriteLine($"Redis write error: {ex.Message}");
                }
            }

            return new ServiceResult 
            { 
                Source = "api", 
                Data = jsonContent 
            };
        }
        catch (Exception ex)
        {
            Console.WriteLine($"API fetch error: {ex.Message}");
            return new ServiceResult 
            { 
                Error = "An internal server error occurred.", 
                StatusCode = 500 
            };
        }
    }
}
