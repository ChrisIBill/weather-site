import Geolocator from "./Components/geolocator";
import "./App.css";
import { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline } from "@mui/material";
import siteTheme from "./lib/siteTheme";
import UserLocationPanel from "./Components/UserLocationPanel";

const UserLocationContext = createContext(null);

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasLocation, setHasLocation] = useState(false);
    const [userLocation, setUserLocation] = useState();
    useEffect(() => {
        if (!isLoaded) {
        }
    });
    const handleEnterKey = (e: { keyCode: number }, loc: any) => {
        if (e.keyCode == 13) {
            console.log(loc);
        }
    };
    return (
        <ThemeProvider theme={siteTheme}>
            <Container component="main" disableGutters={true} maxWidth={false}>
                <CssBaseline enableColorScheme />
                {/* {hasLocation == false ? <UserLocationPanel /> : } */}
                <UserLocationPanel handleEnterKeyz={handleEnterKey} />
            </Container>
        </ThemeProvider>
    );
}

export default App;
