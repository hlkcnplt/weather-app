using Microsoft.Extensions.Options;
using StackExchange.Redis;
using WeatherBackend.Configuration;
using WeatherBackend.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Configuration
builder.Services.Configure<WeatherApiSettings>(builder.Configuration.GetSection("WeatherApi"));

// 2. Add Services (DI)
builder.Services.AddControllers();
builder.Services.AddHttpClient();
builder.Services.AddScoped<IWeatherService, WeatherService>();

// 3. Configure Redis
builder.Services.AddSingleton<IConnectionMultiplexer>(sp => {
    var configText = builder.Configuration.GetConnectionString("Redis") ?? "localhost:6379";
    try {
         var redisOptions = ConfigurationOptions.Parse(configText);
         redisOptions.AbortOnConnectFail = false; 
         return ConnectionMultiplexer.Connect(redisOptions);
    } catch (Exception ex) {
        Console.WriteLine($"Redis connection failed: {ex.Message}");
        // Return a disconnected multiplexer or handle gracefully dependent on library behavior, 
        // but ConnectionMultiplexer.Connect usually throws. 
        // For simplicity in this demo, we might want to let it fail or mock it.
        // However, the service logic checks .IsConnected, so we just need a valid object if possible, 
        // or let the DI container fail.
        throw; 
    }
});


// 4. Configure CORS
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

// 5. Middleware Pipeline
app.UseCors("AllowFrontend");
app.MapControllers();

app.MapGet("/", () => 
    Results.Content("API Server is running (Dotnet - Clean Architecture). Frontend is likely at <a href='http://localhost:5173'>http://localhost:5173</a>", "text/html"));

app.Run();
