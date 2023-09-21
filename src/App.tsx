import "./App.css";
import React from "react";
import { createContext, SetStateAction, useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { Box, Container, CssBaseline, useMediaQuery } from "@mui/material";
import siteTheme from "./lib/siteTheme";
import UserLocationPanel from "./Components/UserLocationPanel";
import GoogleMapsAPIKey from "./lib/APIKeys";
import { getGeolocation } from "./Components/geolocator";
import { WeatherReportDisplay } from "./Components/weatherReports";
import { AreaChartDataType, AreaChartHandlerProps, HourlyWeatherDataType, WeatherDataType } from "./lib/interfaces";
import { Pending } from "@mui/icons-material";
import { useHorizontalScroll } from "./Components/horzScroll";
import { WeatherAreaChart } from "./Components/weatherCharts";
//const WeatherAPIsrc = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${API key}&units=${/* Metric or Imperial */}`;
const WeatherAPISrc = `FarTestWeatherData.json`;
type Coords = [number, number];

interface User {
	id?: string | undefined;
	loc?: Coords;
}

const LoadingScreen = () => {
	return <Pending />;
};
function App() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasLocation, setHasLocation] = useState(false);
	const [userCoords, setUserCoords] = useState<Coords>();
	const [userWeather, setUserWeather] = useState<WeatherDataType>();

	//Async User Location Data Request
	const resolveCallback = (result: any) => {
		setUserCoords(result);
		setHasLocation(true);
	};
	const failCallback = (error: any) => {
		console.log("getGeolocation Failed");
		console.log(error.message);
	};
	function asyncUserLocation() {
		console.log("called async");
		getGeolocation.then(resolveCallback, failCallback);
	}
	asyncUserLocation();

	const handleManualCoords = (loc: any) => {
		setUserCoords(loc);
		setHasLocation(true);
		console.log("Setting Coords: " + loc);
	};
	const LocationHandler = () => {
		return (
			<Box>{hasLocation ? <></> : <UserLocationPanel submitCoords={handleManualCoords} isActive={!hasLocation} />}</Box>
		);
	};
	const GetOpenWeatherData = async (coords: Coords) => {
		fetch(WeatherAPISrc)
			.then((res) => res.json())
			.then(
				(result) => {
					console.log(result);
					setUserWeather(result);
				},
				(error) => {
					console.log(error.message);
					console.log("Error with fetching weather data");
				}
			);
	};

	useEffect(() => {
		if (userCoords) {
			console.log("Getting weather data for coordinates: " + userCoords);
			GetOpenWeatherData(userCoords);
		}
	}, [userCoords]);
	useEffect(() => {
		if (userWeather) {
			if (userWeather.hourly) {
				//convertDataForReport(userWeather.hourly);
			}
		}
	});

	return (
		<ThemeProvider theme={siteTheme}>
			<Container id="App" component="main" disableGutters={true} maxWidth={false} sx={{ flexDirection: "column" }}>
				<CssBaseline enableColorScheme />
				<LocationHandler />
				<>{userWeather?.daily ? <WeatherReportDisplay WeatherData={userWeather.daily} /> : <LoadingScreen />}</>

				{/* <Box sx={{ flexGrow: "1", height: "50%", width: 1 / 1 }}>
					{userWeather?.hourly ? <WeatherAreaChart weatherData={userWeather} /> : <LoadingScreen />}
				</Box> */}
			</Container>
		</ThemeProvider>
	);
}
/* <Box style={{ flexGrow: "1", overflow: "auto" }} ref={useHorizontalScroll()}>
					{userWeather?.daily ? <WeatherReportDisplay WeatherData={userWeather.daily} /> : <LoadingScreen />}
				</Box> */
export default App;
