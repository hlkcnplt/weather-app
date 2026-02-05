package com.weatherapp.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @GetMapping("/")
    public String home() {
        return "API Server is running (Spring Boot). Frontend is likely at <a href='http://localhost:5173'>http://localhost:5173</a>";
    }
}
