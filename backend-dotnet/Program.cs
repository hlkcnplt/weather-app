using Microsoft.Extensions.Options;
using StackExchange.Redis;
using WeatherBackend.Configuration;
using WeatherBackend.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.Configure<WeatherApiSettings>(builder.Configuration.GetSection("WeatherApi"));


builder.Services.AddControllers();
builder.Services.AddHttpClient();
builder.Services.AddScoped<IWeatherService, WeatherService>();


builder.Services.AddSingleton<IConnectionMultiplexer>(sp => {
    var configText = builder.Configuration.GetConnectionString("Redis") ?? "localhost:6379";
    try {
         var redisOptions = ConfigurationOptions.Parse(configText);
         redisOptions.AbortOnConnectFail = false; 
         return ConnectionMultiplexer.Connect(redisOptions);
    } catch (Exception ex) {
        Console.WriteLine($"Redis connection failed: {ex.Message}");

        throw; 
    }
});



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseCors("AllowFrontend");
app.MapControllers();

app.MapGet("/", () => 
    Results.Content("API Server is running (Dotnet - Clean Architecture). Frontend is likely at <a href='http://localhost:5173'>http://localhost:5173</a>", "text/html"));

app.Run();
