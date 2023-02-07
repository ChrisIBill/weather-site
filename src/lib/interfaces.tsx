export type Coords = [number, number];
export interface CurrentWeatherDataType {
    dt: number;
    timezoneOffset: number;
}
export interface MinutelyWeatherDataType {
    dt: number;
    precipitation: number;
}
export interface HourlyWeatherDataType {
    dt: number;
    temp?: number;
    feels_like?: number;
    pressure?: number;
    humidity?: number;
    uvi?: number;
    clouds?: number;
    visibility?: number;
    wind_speed?: number;
    pop?: number;
    weather?: [
        {
            id?: number;
            main?: string;
            description?: string;
        }
    ];
}
export interface DailyWeatherDataType {
    dt: number;
    temp: {
        day: number;
        min?: number;
        max?: number;
        night?: number;
        eve?: number;
        morn?: number;
    };
    feels_like: {
        day?: number;
        night?: number;
        eve?: number;
        morn?: number;
    };
    pressure: number | undefined;
    humidity: number | undefined;
    dew_point: number | undefined;
    wind_speed: number | undefined;
    wind_deg: number | undefined;
    wind_gust: number | undefined;
    clouds: number | undefined;
    pop: number | undefined;
    rain?: number | undefined;
    snow?: number | undefined;
    uvi: number | undefined;
    weather?: [
        {
            id: number;
            main?: string;
            description?: string;
        }
    ];
}
export interface WeatherAlertDataType {
    //IDK What to use as key
    sender_name?: string;
    event?: string;
    start?: number;
    end?: number;
    description?: string;
    tags?: any[];
}
export interface WeatherDataType {
    current?: CurrentWeatherDataType;
    minutely?: MinutelyWeatherDataType[];
    hourly?: HourlyWeatherDataType[];
    daily?: DailyWeatherDataType[];
    alerts?: WeatherAlertDataType[];
}

export interface ReportInfo {
    label: string;
    info: string;
}
export interface WeatherReportDataType {
    time: string;
    dataset: ReportInfo[];
}

export interface ReportDisplayInfo {
    //timeType: "hours" | "days",
    labels: "";
}

export interface AreaChartDataType {
    label: string;
    data: number[];
    fill: any;
    borderColor: string;
    backgroundColor: string;
    borderWidth: number;
    [propName: string]: any;
}
export interface AreaChartHandlerProps {
    labels: Array<string>;
    datasets: Array<Array<number | undefined>>;
    labelDatasets: Array<string>;
    title?: string;
}

export interface DayTemperatures {
    high: number | undefined;
    low: number | undefined;
    morn: (number | undefined)[];
    day: (number | undefined)[];
    eve: (number | undefined)[];
    night: (number | undefined)[];
}
export interface DayMiscWeather {
    pressure: number | undefined;
    humidity: number | undefined;
    dew_point: number | undefined;
    wind_speed: number | undefined;
    wind_deg: number | undefined;
    wind_gust: number | undefined;
    clouds: number | undefined;
    pop: number | undefined;
    rain?: number | undefined;
    snow?: number | undefined;
    uvi: number | undefined;
}
export interface DayWeatherInfo {
    id: number | undefined;
    main: string | undefined;
    description: string | undefined;
}
export interface DayWeatherData {
    dt: number;
    data: {
        temps: DayTemperatures | undefined;
        misc?: DayMiscWeather | undefined;
        weather?: DayWeatherInfo | undefined;
    };
}

export interface CurrentWeatherData {
    dt: string;
    data: {
        temp: number;
        feels: number;
    };
}
export interface SanitizedWeekWeatherData {}
