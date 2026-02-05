package com.weatherapp.backend.controller;

import com.weatherapp.backend.model.ServiceResult;
import com.weatherapp.backend.service.IWeatherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    private final IWeatherService weatherService;

    public WeatherController(IWeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/{city}")
    public CompletableFuture<ResponseEntity<Object>> getWeather(@PathVariable("city") String city) {
        if (city == null || city.trim().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "City parameter required");
            return CompletableFuture.completedFuture(ResponseEntity.badRequest().body(error));
        }

        return weatherService.getWeatherForCityAsync(city).thenApply(result -> {
            if (result.getError() != null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", result.getError());
                return ResponseEntity.status(result.getStatusCode()).body((Object)error);
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("source", result.getSource());
            response.put("data", result.getData());
            return ResponseEntity.ok(response);
        });
    }
}
