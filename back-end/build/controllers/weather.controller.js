"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openmeteo_1 = require("openmeteo");
const API_KEYs = {
    ipgeolocation: "8d906c8091124716b1ed301a05162b3c",
};
const weatherCodes = {
    0: {
        description: "Clear sky",
        icon: { day: "-clear-day.svg", night: "-clear-night.svg" },
    },
    1: { description: "Mainly clear", icon: "" },
    2: {
        description: "Partly Cloudy",
        icon: { day: "-partly-cloudy-day.svg", night: "-partly-cloudy-night.svg" },
    },
    3: { description: "Overcast", icon: "-cloudy.svg" },
    45: {
        description: "Fog",
        icon: {
            day: "-partly-cloudy-day-fog.svg",
            night: "-partly-cloudy-night-fog.svg",
        },
    },
    48: { description: "Depositing rime fog", icon: "-fog.svg" },
    51: {
        description: "Light Drizzle",
        icon: {
            day: "-overcast-day-drizzle.svg",
            night: "-overcast-night-drizzle.svg",
        },
    },
    53: {
        description: "Moderate Drizzle",
        icon: {
            day: "-partly-cloudy-day-drizzle.svg",
            night: "-overcast-night-drizzle.svg",
        },
    },
    55: {
        description: "Dense Intensity Drizzle",
        icon: {
            day: "-extreme-day-drizzle.svg",
            night: "-extreme-night-drizzle.svg",
        },
    },
    56: { description: "Light Freezing Drizzle", icon: "" },
    57: { description: "Dense Intensity Freezing Drizzle", icon: "" },
    61: { description: "Slight Rain", icon: "-overcast-rain.svg" },
    63: {
        description: "Moderate Rain",
        icon: {
            day: "-extreme-day-rain.svg",
            night: "-partly-cloudy-night-rain.svg",
        },
    },
    65: {
        description: "Heavy Intensity Rain",
        icon: { day: "-overcast-day-rain.svg", night: "-overcast-night-rain.svg" },
    },
    66: { description: "Light Freezing Rain", icon: "" },
    67: { description: "Heavy Intensity Freezing Rain", icon: "" },
    71: { description: "Slight Snow Fall", icon: "" },
    73: { description: "Moderate Snow Fall", icon: "" },
    75: { description: "Heavy Intensity Snow Fall", icon: "" },
    77: { description: "Snow Grains", icon: "" },
    80: { description: "Slight Rain Showers", icon: "" },
    81: { description: "Moderate Rain Showers", icon: "" },
    82: { description: "Violent Rain Showers", icon: "" },
    85: { description: "Slight Snow Showers", icon: "" },
    86: { description: "Heavy Snow Showers", icon: "" },
    95: {
        description: "Thunderstorms",
        icon: { day: "-thunderstorms-day.svg", night: "-thunderstorms-night.svg" },
    },
    96: { description: "Thunderstorm with Slight Hail", icon: "" },
    99: { description: "Thunderstorm with Heavy Hail", icon: "" },
};
const _getWeather = async (req, res) => {
    const params = {
        latitude: 17.5711,
        longitude: -87.5859,
        current: [
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "precipitation",
            "rain",
            "showers",
            "weather_code",
            "cloud_cover",
            "pressure_msl",
            "surface_pressure",
            "wind_speed_10m",
            "wind_direction_10m",
            "wind_gusts_10m",
        ],
        hourly: [
            "temperature_2m",
            "relative_humidity_2m",
            "dew_point_2m",
            "apparent_temperature",
            "precipitation_probability",
            "precipitation",
            "rain",
            "showers",
            "weather_code",
            "pressure_msl",
            "surface_pressure",
            "cloud_cover",
            "cloud_cover_low",
            "cloud_cover_mid",
            "cloud_cover_high",
            "visibility",
            "wind_speed_10m",
            "wind_speed_80m",
            "wind_speed_120m",
            "wind_speed_180m",
            "wind_direction_10m",
            "wind_direction_80m",
            "wind_direction_120m",
            "wind_direction_180m",
            "wind_gusts_10m",
            "temperature_80m",
            "temperature_120m",
            "temperature_180m",
            "uv_index",
            "uv_index_clear_sky",
            "sunshine_duration",
            "shortwave_radiation",
            "direct_radiation",
            "diffuse_radiation",
            "direct_normal_irradiance",
        ],
        temperature_unit: "fahrenheit",
        wind_speed_unit: "mph",
        precipitation_unit: "inch",
        forecast_days: 14,
        forecast_hours: 24,
    };
    try {
        const url = "https://api.open-meteo.com/v1/forecast";
        const data = await (0, openmeteo_1.fetchWeatherApi)(url, params);
        // Helper function to form time ranges
        const range = (start, stop, step) => Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
        // Process first location. Add a for-loop for multiple locations or weather models
        const response = data[0];
        // Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const timezone = response.timezone();
        const timezoneAbbreviation = response.timezoneAbbreviation();
        const latitude = response.latitude();
        const longitude = response.longitude();
        const current = response.current();
        const hourly = response.hourly();
        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {
            current: {
                time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                temperature2m: current.variables(0).value(),
                relativeHumidity2m: current.variables(1).value(),
                apparentTemperature: current.variables(2).value(),
                precipitation: current.variables(3).value(),
                rain: current.variables(4).value(),
                showers: current.variables(5).value(),
                weatherCode: current.variables(6).value(),
                cloudCover: current.variables(7).value(),
                pressureMsl: current.variables(8).value(),
                surfacePressure: current.variables(9).value(),
                windSpeed10m: current.variables(10).value(),
                windDirection10m: current.variables(11).value(),
                windGusts10m: current.variables(12).value(),
            },
            hourly: {
                time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
                temperature2m: hourly.variables(0).valuesArray(),
                relativeHumidity2m: hourly.variables(1).valuesArray(),
                dewPoint2m: hourly.variables(2).valuesArray(),
                apparentTemperature: hourly.variables(3).valuesArray(),
                precipitationProbability: hourly.variables(4).valuesArray(),
                precipitation: hourly.variables(5).valuesArray(),
                rain: hourly.variables(6).valuesArray(),
                showers: hourly.variables(7).valuesArray(),
                weatherCode: hourly.variables(8).valuesArray(),
                pressureMsl: hourly.variables(9).valuesArray(),
                surfacePressure: hourly.variables(10).valuesArray(),
                cloudCover: hourly.variables(11).valuesArray(),
                cloudCoverLow: hourly.variables(12).valuesArray(),
                cloudCoverMid: hourly.variables(13).valuesArray(),
                cloudCoverHigh: hourly.variables(14).valuesArray(),
                visibility: hourly.variables(15).valuesArray(),
                windSpeed10m: hourly.variables(16).valuesArray(),
                windSpeed80m: hourly.variables(17).valuesArray(),
                windSpeed120m: hourly.variables(18).valuesArray(),
                windSpeed180m: hourly.variables(19).valuesArray(),
                windDirection10m: hourly.variables(20).valuesArray(),
                windDirection80m: hourly.variables(21).valuesArray(),
                windDirection120m: hourly.variables(22).valuesArray(),
                windDirection180m: hourly.variables(23).valuesArray(),
                windGusts10m: hourly.variables(24).valuesArray(),
                temperature80m: hourly.variables(25).valuesArray(),
                temperature120m: hourly.variables(26).valuesArray(),
                temperature180m: hourly.variables(27).valuesArray(),
                uvIndex: hourly.variables(28).valuesArray(),
                uvIndexClearSky: hourly.variables(29).valuesArray(),
                sunshineDuration: hourly.variables(30).valuesArray(),
                shortwaveRadiation: hourly.variables(31).valuesArray(),
                directRadiation: hourly.variables(32).valuesArray(),
                diffuseRadiation: hourly.variables(33).valuesArray(),
                directNormalIrradiance: hourly.variables(34).valuesArray(),
            },
        };
        // `weatherData` now contains a simple structure with arrays for datetime and weather data
        for (let i = 0; i < weatherData.hourly.time.length; i++) {
            console.table({
                timezone: timezone,
                timezoneAbbreviation: timezoneAbbreviation,
                time: weatherData.hourly.time[i].toISOString(),
                temperature2m: weatherData.hourly.temperature2m[i],
                relativeHumidity2m: weatherData.hourly.relativeHumidity2m[i],
                dewPoint2m: weatherData.hourly.dewPoint2m[i],
                apparentTemperature: weatherData.hourly.apparentTemperature[i],
                precipitationProbability: weatherData.hourly.precipitationProbability[i],
                precipitation: weatherData.hourly.precipitation[i],
                rain: weatherData.hourly.rain[i],
                showers: weatherData.hourly.showers[i],
                weatherCode: weatherData.hourly.weatherCode[i],
                pressureMsl: weatherData.hourly.pressureMsl[i],
                surfacePressure: weatherData.hourly.surfacePressure[i],
                cloudCover: weatherData.hourly.cloudCover[i],
                cloudCoverLow: weatherData.hourly.cloudCoverLow[i],
                cloudCoverMid: weatherData.hourly.cloudCoverMid[i],
                cloudCoverHigh: weatherData.hourly.cloudCoverHigh[i],
                visibility: weatherData.hourly.visibility[i],
                windSpeed10m: weatherData.hourly.windSpeed10m[i],
                windSpeed80m: weatherData.hourly.windSpeed80m[i],
                windSpeed120m: weatherData.hourly.windSpeed120m[i],
                windDirection180m: weatherData.hourly.windDirection180m[i],
                windGusts10m: weatherData.hourly.windGusts10m[i],
                temperature80m: weatherData.hourly.temperature80m[i],
                temperature120m: weatherData.hourly.temperature120m[i],
                temperature180m: weatherData.hourly.temperature180m[i],
                uvIndex: weatherData.hourly.uvIndex[i],
                uvIndexClearSky: weatherData.hourly.uvIndexClearSky[i],
                sunshineDuration: weatherData.hourly.sunshineDuration[i],
                shortwaveRadiation: weatherData.hourly.shortwaveRadiation[i],
                directRadiation: weatherData.hourly.directRadiation[i],
                diffuseRadiation: weatherData.hourly.diffuseRadiation[i],
                directNormalIrradiance: weatherData.hourly.directNormalIrradiance[i],
            });
        }
        // console.log(data);
        return weatherData;
    }
    catch (e) {
        console.error(`Error fetching JSON data: ${e}`);
    }
};
module.exports.getWeather = _getWeather;
const _getMarine = async (req, res) => {
    const params = {
        latitude: 17.5712,
        longitude: -87.5904,
        current: [
            "wave_height",
            "wave_direction",
            "wave_period",
            "wind_wave_height",
            "wind_wave_direction",
            "wind_wave_period",
            "wind_wave_peak_period",
            "swell_wave_height",
            "swell_wave_direction",
            "swell_wave_period",
            "swell_wave_peak_period",
            "ocean_current_velocity",
            "ocean_current_direction",
        ],
        hourly: [
            "wave_height",
            "wave_direction",
            "wind_wave_height",
            "wind_wave_direction",
            "wind_wave_period",
            "wind_wave_peak_period",
            "swell_wave_height",
            "swell_wave_direction",
            "swell_wave_period",
            "swell_wave_peak_period",
            "ocean_current_velocity",
            "ocean_current_direction",
        ],
        length_unit: "imperial",
        wind_speed_unit: "mph",
        forecast_hours: 24,
        models: "best_match",
    };
    try {
        const url = "https://marine-api.open-meteo.com/v1/marine";
        const responses = await (0, openmeteo_1.fetchWeatherApi)(url, params);
        // Helper function to form time ranges
        const range = (start, stop, step) => Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];
        // Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const timezone = response.timezone();
        const timezoneAbbreviation = response.timezoneAbbreviation();
        const latitude = response.latitude();
        const longitude = response.longitude();
        const current = response.current();
        const hourly = response.hourly();
        // Note: The order of weather variables in the URL query and the indices below need to match!
        const marineData = {
            current: {
                time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                waveHeight: current.variables(0).value(),
                waveDirection: current.variables(1).value(),
                wavePeriod: current.variables(2).value(),
                windWaveHeight: current.variables(3).value(),
                windWaveDirection: current.variables(4).value(),
                windWavePeriod: current.variables(5).value(),
                windWavePeakPeriod: current.variables(6).value(),
                swellWaveHeight: current.variables(7).value(),
                swellWaveDirection: current.variables(8).value(),
                swellWavePeriod: current.variables(9).value(),
                swellWavePeakPeriod: current.variables(10).value(),
                oceanCurrentVelocity: current.variables(11).value(),
                oceanCurrentDirection: current.variables(12).value(),
            },
            hourly: {
                time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
                waveHeight: hourly.variables(0).valuesArray(),
                waveDirection: hourly.variables(1).valuesArray(),
                windWaveHeight: hourly.variables(2).valuesArray(),
                windWaveDirection: hourly.variables(3).valuesArray(),
                windWavePeriod: hourly.variables(4).valuesArray(),
                windWavePeakPeriod: hourly.variables(5).valuesArray(),
                swellWaveHeight: hourly.variables(6).valuesArray(),
                swellWaveDirection: hourly.variables(7).valuesArray(),
                swellWavePeriod: hourly.variables(8).valuesArray(),
                swellWavePeakPeriod: hourly.variables(9).valuesArray(),
                oceanCurrentVelocity: hourly.variables(10).valuesArray(),
                oceanCurrentDirection: hourly.variables(11).valuesArray(),
            },
        };
        // `marineData` now contains a simple structure with arrays for datetime and marine data
        for (let i = 0; i < marineData.hourly.time.length; i++) {
            console.log({
                time: marineData.hourly.time[i].toISOString(),
                timezone: timezone,
                timezoneAbbreviation: timezoneAbbreviation,
                waveHeight: marineData.hourly.waveHeight[i],
                waveDirection: marineData.hourly.waveDirection[i],
                windWaveHeight: marineData.hourly.windWaveHeight[i],
                windWaveDirection: marineData.hourly.windWaveDirection[i],
                windWavePeriod: marineData.hourly.windWavePeriod[i],
                windWavePeakPeriod: marineData.hourly.windWavePeakPeriod[i],
                swellWaveHeight: marineData.hourly.swellWaveHeight[i],
                swellWaveDirection: marineData.hourly.swellWaveDirection[i],
                swellWavePeriod: marineData.hourly.swellWavePeriod[i],
                swellWavePeakPeriod: marineData.hourly.swellWavePeakPeriod[i],
                oceanCurrentVelocity: marineData.hourly.oceanCurrentVelocity[i],
                oceanCurrentDirection: marineData.hourly.oceanCurrentDirection[i],
            });
        }
        // console.log(marineData);
        return marineData;
    }
    catch (e) {
        console.error(`Error fetching JSON data: ${e}`);
    }
};
module.exports.getMarine = _getMarine;
const _getSunriseSunset = async (req, res) => {
    const date_start = new Date().toISOString().split("T")[0];
    const date_end = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    const url = `https://api.sunrisesunset.io/json?lat=17.5711&lng=-87.5859&timezone=UTC&date_start=${date_start}&date_end=${date_end}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (e) {
        console.error(`Error fetching JSON data: ${e}`);
    }
};
const _getAstro = async (req, res) => {
    const date = new Date().toISOString().split("T")[0];
    const url = `https://api.ipgeolocation.io/astronomy?apiKey=${API_KEYs.ipgeolocation}&lat=17.5711&long=-87.5859&date=${date}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (e) {
        console.error(`Error fetching JSON data: ${e}`);
    }
};
module.exports.getAstro = _getAstro;
