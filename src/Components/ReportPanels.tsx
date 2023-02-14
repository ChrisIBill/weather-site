import { Container, Typography, Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { DailyWeatherDataType, WeatherDataType } from "../lib/interfaces";
import { WeatherAreaChart } from "./weatherCharts";

function temperatureString(x: number | undefined) {
    return Math.trunc(x || Infinity) + "°";
}
const kelvinToCelsius = (temp: number) => {
    return temp - 273.15;
};
const WeatherDataPanel = (weatherData: DailyWeatherDataType) => {
    const panelTypes = ["Temperatures", "Misc"] as const;
    const daySegments = ["morn", "day", "eve", "night"];
    const [panelType, setPanelType] = useState("Temperatures");
    const temp = weatherData.temp;
    const feels = weatherData.feels_like;
    const temps = {
        high: temperatureString(temp.max),
        low: temperatureString(temp.min),
        morn: [temperatureString(temp.morn), temperatureString(feels.morn)],
        day: [temperatureString(temp.day), temperatureString(feels.day)],
        eve: [temperatureString(temp.eve), temperatureString(feels.eve)],
        night: [temperatureString(temp.night), temperatureString(feels.night)],
    };
    const handleClick = () => {
        setPanelType(panelType === "Temperatures" ? "Misc" : "Temperatures");
    };
    const PanelContent = () => {
        if (panelType === "Temperatures") {
            return (
                <Container>
                    <Typography className="reportTypography" variant="h5">
                        High: {temps.high}
                    </Typography>
                    <Typography className="reportTypography" variant="h5">
                        Low: {temps.low}
                    </Typography>
                    <Grid2 style={{ display: "flex" }}>
                        <Grid2 xs={4}>
                            <Typography className="reportTypography">
                                Actual
                                <br />
                                {temps.morn[0]} <br />
                                {temps.day[0]} <br />
                                {temps.eve[0]} <br />
                                {temps.night[0]} <br />
                            </Typography>
                        </Grid2>
                        <Grid2 xs={4}>
                            <Typography className="reportTypography">
                                <br />
                                Morning
                                <br />
                                Day
                                <br />
                                Evening
                                <br />
                                Night
                                <br />
                            </Typography>
                        </Grid2>
                        <Grid2 xs={4}>
                            <Typography className="reportTypography">
                                Feels Like
                                <br />
                                {temps.morn[1]} <br />
                                {temps.day[1]} <br />
                                {temps.eve[1]} <br />
                                {temps.night[1]} <br />
                            </Typography>
                        </Grid2>
                    </Grid2>
                </Container>
            );
        } else if (panelType === "Misc") {
            return (
                <Container>
                    <Typography className="reportTypography"></Typography>
                </Container>
            );
        } else return <>ERROR</>;
    };

    return (
        <Box
            sx={{
                width: "100%",
                borderRadius: 10,
                backgroundColor: "#00000080",
                "&:hover": {
                    backgroundColor: "#00000060",
                },
            }}
            onClick={handleClick}
        >
            <Typography className="reportTypography" variant="h4">
                {panelType}
            </Typography>
            <PanelContent />
        </Box>
    );
};
const WeatherChartsPanel = ({
    weatherData,
}: {
    weatherData: WeatherDataType;
}) => {
    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                borderRadius: 10,
                backgroundColor: "#00000080",
                "&:hover": {
                    backgroundColor: "#00000060",
                },
            }}
        >
            <WeatherAreaChart weatherData={weatherData} />
        </Box>
    );
};
export const ReportPanels = ({
    weatherData,
    numDay,
}: {
    weatherData: WeatherDataType;
    numDay: number;
}) => {
    return (
        <Grid2 container spacing={2}>
            <Grid2 md={12} lg={6}>
                {WeatherDataPanel(weatherData.daily[numDay])}
            </Grid2>
            <Grid2 md={12} lg={6}>
                <WeatherChartsPanel weatherData={weatherData} />
            </Grid2>
        </Grid2>
    );
};
