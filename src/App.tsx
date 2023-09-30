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
import {
	AreaChartDataType,
	AreaChartHandlerProps,
	HourlyWeatherDataType,
	CoordinatesType,
	WeatherDataType,
} from "./lib/interfaces";
import { Pending } from "@mui/icons-material";
import { useHorizontalScroll } from "./Components/horzScroll";
import { WeatherAreaChart } from "./Components/weatherCharts";
import { cancellablePromise } from "./lib/lib";
//const WeatherAPIsrc = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${API key}&units=${/* Metric or Imperial */}`;
const WeatherAPISrc = `FarTestWeatherData.json`;

const LoadingScreen = () => {
	return <Pending />;
};
function App() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasLocation, setHasLocation] = useState(false);
	const [userCoords, setUserCoords] = useState<CoordinatesType>();
	const [userWeather, setUserWeather] = useState<WeatherDataType>();
	const [helperText, setHelperText] = useState<string>("");

	//Async User Location Data Request
	const resolveGeoCallback = (result: CoordinatesType) => {
		setUserCoords(result);
		setHasLocation(true);
	};
	const failGeoCallback = (error: any) => {
		console.log("getGeolocation Failed");
		console.log(error.message);
	};
	function asyncUserLocation() {
		console.log("called async");
		//Need to cancel this promise if user manually enters location
		//or if user denies location
		//or if user is on a device that doesn't support geolocation
		//or if user is on a browser that doesn't support geolocation
		cancellablePromise(getGeolocation).promise.then(
			resolveGeoCallback,
			failGeoCallback
		);
		const p = getGeolocation.then(resolveGeoCallback, failGeoCallback);
	}
	asyncUserLocation();

	const handleManualCoords = (loc: any) => {
		setUserCoords(loc);
		setHasLocation(true);
		console.log("Setting Coords: " + loc);
	};

	const LocationHandler = () => {
		return (
			<Box>
				{hasLocation ? (
					<></>
				) : (
					<UserLocationPanel
						submitCoords={handleManualCoords}
						isActive={!hasLocation}
					/>
				)}
			</Box>
		);
	};
	const GetOpenWeatherData = async (coords: CoordinatesType) => {
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
			<Container
				id="App"
				component="main"
				disableGutters={true}
				maxWidth={false}
				sx={{ flexDirection: "column" }}
			>
				<CssBaseline enableColorScheme />
				<LocationHandler />
				<>
					{userWeather?.daily ? (
						<WeatherReportDisplay WeatherData={userWeather.daily} />
					) : (
						<LoadingScreen />
					)}
				</>

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
