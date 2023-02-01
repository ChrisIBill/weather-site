import "./App.css";
import { createContext, SetStateAction, useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline } from "@mui/material";
import siteTheme from "./lib/siteTheme";
import UserLocationPanel from "./Components/UserLocationPanel";
import GoogleMapsAPIKey from "./lib/APIKeys";
import { getGeolocation } from "./Components/geolocator";
type Coords = [number, number] | undefined;
interface User {
	id?: string | undefined;
	loc?: Coords;
}

const UserContext = createContext<User>({ id: undefined, loc: undefined });
function App() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasLocation, setHasLocation] = useState(false);
	const [userCoords, setUserCoords] = useState<Coords>([0, 0]);

	const resolveCallback = (result: any) => {
		setUserCoords(result);
		setHasLocation(true);
	};
	const failCallback = (error: any) => {
		console.log("Error here");
	};
	function asyncUserLocation() {
		console.log("called async");
		getGeolocation.then(resolveCallback, failCallback);
	}
	asyncUserLocation();
	const handleEnterKey = (e: { keyCode: number }) => {
		if (e.keyCode == 13) {
			console.log();
		}
	};
	const setCoords = (loc: any) => {
		setUserCoords(loc);
		setHasLocation(true);
		console.log("Setting Coords: " + loc);
	};

	return (
		<ThemeProvider theme={siteTheme}>
			<Container component="main" disableGutters={true} maxWidth={false}>
				<CssBaseline enableColorScheme />
				{/* {hasLocation == false ? <UserLocationPanel /> : } */}
				{/* <UserLocationPanel onEnterKey={handleEnterKey} value={userCoords} isActive={!hasLocation} /> */}

				<UserLocationPanel submitCoords={setCoords} isActive={!hasLocation} />
				<div>{userCoords}</div>
			</Container>
		</ThemeProvider>
	);
}

export default App;
