package com.weatherapp.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.weatherapp.backend.config.WeatherApiSettings;
import com.weatherapp.backend.model.ServiceResult;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.scheduling.annotation.Async;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

@Service
public class WeatherService implements IWeatherService {

    private final StringRedisTemplate redisTemplate;
    private final RestTemplate restTemplate;
    private final WeatherApiSettings settings;
    private final ObjectMapper objectMapper;

    public WeatherService(StringRedisTemplate redisTemplate, RestTemplate restTemplate, WeatherApiSettings settings, ObjectMapper objectMapper) {
        this.redisTemplate = redisTemplate;
        this.restTemplate = restTemplate;
        this.settings = settings;
        this.objectMapper = objectMapper;
    }

    @Override
    @Async
    public CompletableFuture<ServiceResult> getWeatherForCityAsync(String city) {
        String cacheKey = "weather:current:" + city.toLowerCase();


        try {
            String cachedData = redisTemplate.opsForValue().get(cacheKey);
            if (cachedData != null) {
                JsonNode json = objectMapper.readTree(cachedData);
                return CompletableFuture.completedFuture(new ServiceResult("cache", json));
            }
        } catch (Exception ex) {
            System.err.println("Redis read error: " + ex.getMessage());
        }


        try {
            String url = String.format("%s/forecast.json?key=%s&q=%s&days=3", 
                settings.getBaseUrl(), settings.getKey(), city);
            
            System.out.println("Fetching URL: " + url);
            
            String response = restTemplate.getForObject(url, String.class);
            
            if (response != null) {

                try {
                    redisTemplate.opsForValue().set(cacheKey, response, 30, TimeUnit.MINUTES);
                } catch (Exception ex) {
                    System.err.println("Redis write error: " + ex.getMessage());
                }

                JsonNode json = objectMapper.readTree(response);
                return CompletableFuture.completedFuture(new ServiceResult("api", json));
            } else {
                return CompletableFuture.completedFuture(new ServiceResult("Could not retrieve weather data.", 503));
            }

        } catch (Exception ex) {
            System.err.println("API fetch error: " + ex.getMessage());
            ex.printStackTrace();
            return CompletableFuture.completedFuture(new ServiceResult("API fetch error: " + ex.toString(), 500));
        }
    }
}
