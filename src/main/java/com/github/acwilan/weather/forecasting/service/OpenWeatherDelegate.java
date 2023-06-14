package com.github.acwilan.weather.forecasting.service;

import com.github.acwilan.weather.forecasting.model.ApiWeatherLocalPost200Response;
import com.github.acwilan.weather.forecasting.model.ApiWeatherLocalPostRequest;
import com.github.acwilan.weather.forecasting.resource.ApiWeatherLocalApiDelegate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class OpenWeatherDelegate implements ApiWeatherLocalApiDelegate {
    @Override
    public ResponseEntity<ApiWeatherLocalPost200Response> apiWeatherLocalPost(final ApiWeatherLocalPostRequest apiWeatherLocalPostRequest) {
        return ApiWeatherLocalApiDelegate.super.apiWeatherLocalPost(apiWeatherLocalPostRequest);
    }
}
