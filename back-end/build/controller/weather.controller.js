"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openmeteo_1 = require("@atombrenner/openmeteo");
let params;
let latitude, longitude, timezone, forecast_days, hourly, daily, current;
const _getWeather = async (req, res) => {
    if (!req.body.latitude || !req.body.longitude) {
        params = {
            latitude: 17.55,
            longitude: -87.57,
            timezone: "America/Belize",
            forecast_days: 5,
            hourly: ["temperature_2m", "rain"],
            daily: ["temperature_2m_max", "sunrise", "sunset"],
            current: ["apparent_temperature"],
        };
        latitude = params.latitude;
        longitude = params.longitude;
        timezone = params.timezone;
        forecast_days = params.forecast_days;
        hourly = params.hourly;
        daily = params.daily;
        current = params.current;
    }
    else {
        latitude = req.body.latitude;
        longitude = req.body.longitude;
        timezone = req.body.timezone;
        forecast_days = req.body.forecast_days;
        hourly = req.body.hourly;
        daily = req.body.daily;
        current = req.body.current;
        const data = await (0, openmeteo_1.fetchWeatherData)({
            latitude,
            longitude,
            timezone,
            forecast_days,
            hourly,
            daily,
            current,
        });
        res.json(data);
        console.log(data);
    }
};
module.exports.getWeather = _getWeather;
