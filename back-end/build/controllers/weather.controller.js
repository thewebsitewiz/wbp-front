"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openmeteo_1 = require("openmeteo");
const moment_1 = __importDefault(require("moment"));
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
    3: { description: "Overcast", icon: { day: "-cloudy.svg" } },
    45: {
        description: "Fog",
        icon: {
            day: "-partly-cloudy-day-fog.svg",
            night: "-partly-cloudy-night-fog.svg",
        },
    },
    48: { description: "Depositing rime fog", icon: { day: "-fog.svg" } },
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
    61: { description: "Slight Rain", icon: { day: "-overcast-rain.svg" } },
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
const _getEnvironmentalData = async (req, res) => {
    let weatherData = {};
    try {
        weatherData = await _getWeather(req, res);
    }
    catch (e) {
        console.error(`Error fetching weather data: ${e}`);
    }
    const sunriseSunsetData = await _getSunriseSunset(req, res);
    // const astroData = _getAstro(req, res);
    const moonPhaseData = await _getMoonPhase(req, res);
    const environmentalData = {
        weather: weatherData,
        sunriseSunset: sunriseSunsetData,
        moonPhase: moonPhaseData,
    };
    return environmentalData;
};
module.exports.getEnvironmentalData = _getEnvironmentalData;
const _getWeather = async (req, res) => {
    const params = {
        latitude: 17.5711,
        longitude: -87.5859,
        current: [
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "is_day",
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
            "wind_direction_10m",
            "wind_gusts_10m",
            "uv_index",
            "uv_index_clear_sky",
            "is_day",
            "sunshine_duration",
        ],
        daily: [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min",
            "apparent_temperature_max",
            "apparent_temperature_min",
            "sunrise",
            "sunset",
            "daylight_duration",
            "sunshine_duration",
            "uv_index_max",
            "uv_index_clear_sky_max",
            "precipitation_sum",
            "rain_sum",
            "showers_sum",
            "precipitation_hours",
            "precipitation_probability_max",
            "wind_speed_10m_max",
            "wind_gusts_10m_max",
            "wind_direction_10m_dominant",
        ],
        temperature_unit: "fahrenheit",
        wind_speed_unit: "mph",
        precipitation_unit: "inch",
        timezone: "America/Chicago",
        forecast_days: 14,
        forecast_hours: 24,
        models: "best_match",
    };
    const url = "https://api.open-meteo.com/v1/forecast";
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
    const daily = response.daily();
    console.log("Current: ", current);
    console.log("Hourly: ", hourly);
    console.log("Daily: ", daily);
    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature2m: current.variables(0).value(),
            relativeHumidity2m: current.variables(1).value(),
            apparentTemperature: current.variables(2).value(),
            isDay: current.variables(3).value(),
            precipitation: current.variables(4).value(),
            rain: current.variables(5).value(),
            showers: current.variables(6).value(),
            weatherCode: current.variables(7).value(),
            cloudCover: current.variables(8).value(),
            pressureMsl: current.variables(9).value(),
            surfacePressure: current.variables(10).value(),
            windSpeed10m: current.variables(11).value(),
            windDirection10m: current.variables(12).value(),
            windGusts10m: current.variables(13).value(),
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
            windDirection10m: hourly.variables(17).valuesArray(),
            windGusts10m: hourly.variables(18).valuesArray(),
            uvIndex: hourly.variables(19).valuesArray(),
            uvIndexClearSky: hourly.variables(20).valuesArray(),
            isDay: hourly.variables(21).valuesArray(),
            sunshineDuration: hourly.variables(22).valuesArray(),
        },
        daily: {
            time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
            weatherCode: daily.variables(0).valuesArray(),
            temperature2mMax: daily.variables(1).valuesArray(),
            temperature2mMin: daily.variables(2).valuesArray(),
            apparentTemperatureMax: daily.variables(3).valuesArray(),
            apparentTemperatureMin: daily.variables(4).valuesArray(),
            sunrise: daily.variables(5).valuesArray(),
            sunset: daily.variables(6).valuesArray(),
            daylightDuration: daily.variables(7).valuesArray(),
            sunshineDuration: daily.variables(8).valuesArray(),
            uvIndexMax: daily.variables(9).valuesArray(),
            uvIndexClearSkyMax: daily.variables(10).valuesArray(),
            precipitationSum: daily.variables(11).valuesArray(),
            rainSum: daily.variables(12).valuesArray(),
            showersSum: daily.variables(13).valuesArray(),
            precipitationHours: daily.variables(14).valuesArray(),
            precipitationProbabilityMax: daily.variables(15).valuesArray(),
            windSpeed10mMax: daily.variables(16).valuesArray(),
            windGusts10mMax: daily.variables(17).valuesArray(),
            windDirection10mDominant: daily.variables(18).valuesArray(),
            shortwaveRadiationSum: daily.variables(19).valuesArray(),
        },
        hourlyForecast: [],
        dailyForecast: [],
    };
    // `weatherData` now contains a simple structure with arrays for datetime and weather data
    /*   for (let i = 0; i < weatherData.hourly.time.length; i++) {
        weatherData.hourlyForecast.push({
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
          windDirection10m: weatherData.hourly.windDirection10m[i],
          windGusts10m: weatherData.hourly.windGusts10m[i],
          uvIndex: weatherData.hourly.uvIndex[i],
          uvIndexClearSky: weatherData.hourly.uvIndexClearSky[i],
          isDay: weatherData.hourly.isDay[i],
          sunshineDuration: weatherData.hourly.sunshineDuration[i],
        });
      }
      for (let i = 0; i < weatherData.daily.time.length; i++) {
        weatherData.dailyForecast.push({
          time: weatherData.daily.time[i].toISOString(),
          weatherCode: weatherData.daily.weatherCode[i],
          temperature2mMax: weatherData.daily.temperature2mMax[i],
          temperature2mMin: weatherData.daily.temperature2mMin[i],
          apparentTemperatureMax: weatherData.daily.apparentTemperatureMax[i],
          apparentTemperatureMin: weatherData.daily.apparentTemperatureMin[i],
          sunrise: weatherData.daily.sunrise[i],
          sunset: weatherData.daily.sunset[i],
          daylightDuration: weatherData.daily.daylightDuration[i],
          sunshineDuration: weatherData.daily.sunshineDuration[i],
          uvIndexMax: weatherData.daily.uvIndexMax[i],
          uvIndexClearSkyMax: weatherData.daily.uvIndexClearSkyMax[i],
          precipitationSum: weatherData.daily.precipitationSum[i],
          rainSum: weatherData.daily.rainSum[i],
          showersSum: weatherData.daily.showersSum[i],
          precipitationHours: weatherData.daily.precipitationHours[i],
          precipitationProbabilityMax:
            weatherData.daily.precipitationProbabilityMax[i],
          windSpeed10mMax: weatherData.daily.windSpeed10mMax[i],
          windGusts10mMax: weatherData.daily.windGusts10mMax[i],
          windDirection10mDominant: weatherData.daily.windDirection10mDominant[i],
        });
      } */
    return weatherData;
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
            /*console.log({
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
            }); */
        }
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
    const url = `https://api.sunrisesunset.io/json?lat=17.5711&lng=-87.5859&timezone=CST&date_start=${date_start}&date_end=${date_end}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log("Sunrise Sunset: ", data);
        return data;
    }
    catch (e) {
        console.error(`Error fetching JSON data: ${e}`);
    }
};
const _getAstro = async (req, res) => {
    const date = new Date().toISOString().split("T")[0];
    console.log("Astro Date: ", date);
    const url = `https://api.ipgeolocation.io/astronomy?apiKey=${API_KEYs.ipgeolocation}&lat=17.5711&long=-87.5859&date=${date}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log("getAstro: ", data);
        return data;
    }
    catch (e) {
        console.error(`Error fetching JSON data: ${e}`);
    }
};
module.exports.getAstro = _getAstro;
const _getMoonPhase = async (req, res) => {
    // Retrieve a unix timestamp for date
    const time = new Date();
    const timestamp = time.getTime();
    const date = Math.round(timestamp / 1000); //Returns a unix timestamp ie. 1572958651
    const DBdate = (0, moment_1.default)().format("MMM Do YY");
    const url = `http://api.farmsense.net/v1/moonphases/?d=${date}`;
    const response = await fetch(url);
    let data = [];
    data = await response.json();
    if (data.length === 0 || data[0].Error) {
        console.error(`Error fetching JSON data: ${data[0].ErrorMsg}`);
        throw new Error(data[0].ErrorMsg);
    }
    else {
        data = data[0];
        // console.log("Moon data: ", data);
        return data;
    }
    /*
  TIMESTAMP TESTS
  11% Waning Crescent: 49403867651 **
  100% Full Moon: 39209867651
  Waxing Crescent: 59403867651
  1st Quarter: 59666674651
  Waning Crescent: 5998374651
  New Moon: 5993902651
  31% Waxing Cresecnet: 5900002651
  30% Waxing Crescent: 6900115651
  3% Waning Crescent: 88379867651
  */
};
module.exports.getMoonPhase = _getMoonPhase;
const _scrapeMoonPhase = async (time) => {
    const timestamp = time.getTime();
    const date = Math.round(timestamp / 1000); //Returns a unix timestamp ie. 1572958651
    const DBdate = (0, moment_1.default)().format("YYYY-MM-DD");
    // Make request to Farmsense API to retrieve moon phase
    const url = `http://api.farmsense.net/v1/moonphases/?d=${date}`;
    const response = await fetch(url);
    let data = [];
    data = await response.json();
    if (data.length === 0 || data[0].Error) {
        console.error(`Error fetching JSON data: ${data[0].ErrorMsg}`);
        throw new Error(data[0].ErrorMsg);
    }
    else {
        data = data[0];
        //console.log("Moon Phase: ", data);
        return data;
        /*
        [
          {
            Error: 0,
            ErrorMsg: "success",
            TargetDate: "1718640497",
            Moon: ["Honey Moon"],
            Index: 10,
            Age: 10.49036191242409,
            Phase: "Waxing Gibbous",
            Distance: 400940.18,
            Illumination: 0.81,
            AngularDiameter: 0.4967278557765187,
            DistanceToSun: 152003508.738933,
            SunAngularDiameter: 0.5246928164334679,
          },
        ];
        */
    }
};
module.exports.scrapeMoonPhase = _scrapeMoonPhase;
/*
      hourly: {
        time: range(
          Number(hourly.time()),
          Number(hourly.timeEnd()),
          hourly.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        temperature2m: hourly.variables(0)!.valuesArray()!,
        relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
        dewPoint2m: hourly.variables(2)!.valuesArray()!,
        apparentTemperature: hourly.variables(3)!.valuesArray()!,
        precipitationProbability: hourly.variables(4)!.valuesArray()!,
        precipitation: hourly.variables(5)!.valuesArray()!,
        rain: hourly.variables(6)!.valuesArray()!,
        showers: hourly.variables(7)!.valuesArray()!,
        weatherCode: hourly.variables(8)!.valuesArray()!,
        pressureMsl: hourly.variables(9)!.valuesArray()!,
        surfacePressure: hourly.variables(10)!.valuesArray()!,
        cloudCover: hourly.variables(11)!.valuesArray()!,
        cloudCoverLow: hourly.variables(12)!.valuesArray()!,
        cloudCoverMid: hourly.variables(13)!.valuesArray()!,
        cloudCoverHigh: hourly.variables(14)!.valuesArray()!,
        visibility: hourly.variables(15)!.valuesArray()!,
        windSpeed10m: hourly.variables(16)!.valuesArray()!,
        windSpeed80m: hourly.variables(17)!.valuesArray()!,
        windSpeed120m: hourly.variables(18)!.valuesArray()!,
        windSpeed180m: hourly.variables(19)!.valuesArray()!,
        windDirection10m: hourly.variables(20)!.valuesArray()!,
        windDirection80m: hourly.variables(21)!.valuesArray()!,
        windDirection120m: hourly.variables(22)!.valuesArray()!,
        windDirection180m: hourly.variables(23)!.valuesArray()!,
        windGusts10m: hourly.variables(24)!.valuesArray()!,
        temperature80m: hourly.variables(25)!.valuesArray()!,
        temperature120m: hourly.variables(26)!.valuesArray()!,
        temperature180m: hourly.variables(27)!.valuesArray()!,
        uvIndex: hourly.variables(28)!.valuesArray()!,
        uvIndexClearSky: hourly.variables(29)!.valuesArray()!,
        sunshineDuration: hourly.variables(30)!.valuesArray()!,
        shortwaveRadiation: hourly.variables(31)!.valuesArray()!,
        directRadiation: hourly.variables(32)!.valuesArray()!,
        diffuseRadiation: hourly.variables(33)!.valuesArray()!,
        directNormalIrradiance: hourly.variables(34)!.valuesArray()!,
      },
      */
