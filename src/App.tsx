import "./App.css";
import { createContext, SetStateAction, useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { Box, Container, CssBaseline } from "@mui/material";
import siteTheme from "./lib/siteTheme";
import UserLocationPanel from "./Components/UserLocationPanel";
import GoogleMapsAPIKey from "./lib/APIKeys";
import { getGeolocation } from "./Components/geolocator";
import { DailyWeatherReports } from "./Components/weatherReports";
import { WeatherDataType } from "./lib/interfaces";
import { Pending } from "@mui/icons-material";
import { useHorizontalScroll } from "./Components/horzScroll";
const WeatherAPISrc = `testWeatherData.json`;
type Coords = [number, number];
interface User {
	id?: string | undefined;
	loc?: Coords;
}
interface Elem {
	temp: { day: number };
}

const UserContext = createContext<User>({ id: undefined, loc: undefined });
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
	const GetOpenWeatherData = (coords: Coords) => {
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
		let ignore = false;
		console.log("Mounted");

		return () => {
			ignore = true;
			console.log("Unmounting");
		};
	}, []);

	useEffect(() => {
		if (userCoords) {
			console.log("Getting weather data for coordinates: " + userCoords);
			GetOpenWeatherData(userCoords);
		}
	}, [userCoords]);

	useEffect(() => {
		console.log("Re-rendering");
		/* let ignore = false;
		if (!ignore) {
			userWeather ? DailyWeatherReports(userWeather.daily) : console.log("Error: unexpected weather data");
		} */
	}, [userWeather]);
	return (
		<ThemeProvider theme={siteTheme}>
			<Container component="main" disableGutters={true} maxWidth={false}>
				<CssBaseline enableColorScheme />
				<UserLocationPanel submitCoords={handleManualCoords} isActive={!hasLocation} />
				<Box style={{ minHeight: "fit-content", overflow: "auto" }} ref={useHorizontalScroll()}>
					{userWeather ? <DailyWeatherReports dailyWeatherData={userWeather.daily} /> : <LoadingScreen />}
				</Box>
			</Container>
		</ThemeProvider>
	);
}

export default App;
