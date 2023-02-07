import {
    CurrentWeatherData,
    DailyWeatherDataType,
    DayWeatherData,
} from "../lib/interfaces";

export default function sanitizeWeatherData(weatherData: any) {}

function truncate(x: number | undefined) {
    return Math.trunc(x || Infinity);
}
function temperatureString(x: number | undefined) {
    return Math.trunc(x || Infinity) + "°";
}
export function sanitizeDailyWeatherData(
    weatherData: DailyWeatherDataType[]
): DayWeatherData[] {
    const weekData: DayWeatherData[] = [];
    weatherData.forEach((elem) => {
        const temp = elem.temp;
        const feels = elem.feels_like;
        const weather = elem.weather;
        weekData.push({
            dt: elem.dt,
            data: {
                temps: {
                    high: truncate(temp.max),
                    low: truncate(temp.min),
                    morn: [truncate(elem.temp.morn), truncate(feels.morn)],
                    day: [truncate(elem.temp.day), truncate(feels.day)],
                    eve: [truncate(elem.temp.eve), truncate(feels.eve)],
                    night: [truncate(elem.temp.night), truncate(feels.night)],
                },
                misc: {
                    pressure: elem.pressure,
                    humidity: elem.humidity,
                    dew_point: elem.dew_point,
                    wind_speed: elem.wind_speed,
                    wind_deg: elem.wind_deg,
                    wind_gust: elem.wind_gust,
                    clouds: elem.clouds,
                    pop: elem.pop,
                    rain: elem.rain,
                    snow: elem.snow,
                    uvi: elem.uvi,
                },
            },
        });
    });
    return [];
}
