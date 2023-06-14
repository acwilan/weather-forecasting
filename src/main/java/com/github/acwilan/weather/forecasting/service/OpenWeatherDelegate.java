package com.github.acwilan.weather.forecasting.service;

import com.github.acwilan.weather.forecasting.model.ApiWeatherLocalPost200Response;
import com.github.acwilan.weather.forecasting.model.ApiWeatherLocalPostRequest;
import com.github.acwilan.weather.forecasting.remote.openweather.api.CurrentWeatherDataApi;
import com.github.acwilan.weather.forecasting.remote.openweather.model.Weather;
import com.github.acwilan.weather.forecasting.resource.ApiWeatherLocalApiDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.stream.Collectors;

@Service
public class OpenWeatherDelegate implements ApiWeatherLocalApiDelegate {
    private final CurrentWeatherDataApi currentWeatherDataApi;

    @Autowired
    public OpenWeatherDelegate(final CurrentWeatherDataApi currentWeatherDataApi,
                               @Value("${apiKey:}") final String apiKey) {
        currentWeatherDataApi.getApiClient().setApiKey(apiKey);
        this.currentWeatherDataApi = currentWeatherDataApi;
    }

    @Override
    public ResponseEntity<ApiWeatherLocalPost200Response> apiWeatherLocalPost(final ApiWeatherLocalPostRequest apiWeatherLocalPostRequest) {
        final var weather = currentWeatherDataApi.currentWeatherData(apiWeatherLocalPostRequest.getLocation(), null, null, null, null, null, null, null);
        final var response = new ApiWeatherLocalPost200Response();
        response.setTemperature(weather.getMain().getTemp());
        response.setHumidity(new BigDecimal(weather.getMain().getHumidity()));
        response.setWindSpeed(weather.getWind().getSpeed());
        response.setCondition(weather.getWeather().stream().map(Weather::getDescription).collect(Collectors.joining(", ")));
        return ResponseEntity.ok(response);
    }
}
