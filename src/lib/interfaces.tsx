type Coords = [number, number];
interface DailyWeatherType {
	dt: number;
	temp: {
		day: number;
		min: number;
		max: number;
		night: number;
		eve: number;
		morn: number;
	};
	weather: [
		{
			id: number;
			main: string;
			description: string;
		}
	];
}
interface HourlyWeatherType {
	dt: number;
	temp: number;
	weather: [
		{
			id: number;
			main: string;
			description: string;
		}
	];
}
interface WeatherDataType {
	minutely: any[];
	hourly: HourlyWeatherType[];
	daily: DailyWeatherType[];
	alerts: any[];
}
export type { Coords, DailyWeatherType, HourlyWeatherType, WeatherDataType };
