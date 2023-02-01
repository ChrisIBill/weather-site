import Geolocator from "./Components/geolocator";
import "./App.css";
import { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline } from "@mui/material";
import siteTheme from "./lib/siteTheme";
import UserLocationPanel from "./Components/UserLocationPanel";
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

	const handleEnterKey = (e: { keyCode: number }) => {
		if (e.keyCode == 13) {
			console.log();
		}
	};
	const setCoords = (loc: Coords) => {
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
			</Container>
		</ThemeProvider>
	);
}

export default App;
