package com.weatherapp.backend.service;

import com.weatherapp.backend.model.ServiceResult;
import java.util.concurrent.CompletableFuture;

public interface IWeatherService {
    CompletableFuture<ServiceResult> getWeatherForCityAsync(String city);
}
