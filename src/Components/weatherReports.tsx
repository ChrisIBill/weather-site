import { AspectRatio } from "@mui/icons-material";
import {
    Box,
    Container,
    Divider,
    Drawer,
    Pagination,
    Paper,
    Skeleton,
    styled,
    Typography,
} from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import Grid2 from "@mui/material/Unstable_Grid2";
import { height } from "@mui/system";
import moment from "moment";
import "./weatherReports.scss";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { JsxElement } from "typescript";
import {
    DailyWeatherDataType,
    DayTemperatures,
    DayWeatherData,
    ReportInfo,
    WeatherDataType,
    WeatherReportDataType,
} from "../lib/interfaces";
import errImg from "../weather-images/errImg.jpg";
import { id2xx } from "../weather-images/id2xx.jpg";

interface DisplayInfoType {
    imageSrc: string;
    effects: string;
    backgroundMask: string;
}

const styles = {
    DailyReportContainer: {
        //minHeight: 300,
        backgroundSize: "cover",
        backgroundPositionY: "50%",
    },
};

function temperatureString(x: number | undefined) {
    return Math.trunc(x || Infinity) + "°";
}
const kelvinToCelsius = (temp: number) => {
    return temp - 273.15;
};
const Root = styled("div")(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
        backgroundColor: red[500],
    },
    [theme.breakpoints.up("md")]: {
        backgroundColor: blue[500],
    },
    [theme.breakpoints.up("lg")]: {
        backgroundColor: green[500],
    },
}));

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
        console.log("click");
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
const WeatherChartsPanel = () => {
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
        ></Box>
    );
};
const ReportPanels = (weatherData: DailyWeatherDataType) => {
    return (
        <Grid2 container spacing={2}>
            <Grid2 md={12} lg={6}>
                {WeatherDataPanel(weatherData)}
            </Grid2>
            <Grid2 md={12} lg={6}>
                <WeatherChartsPanel />
            </Grid2>
        </Grid2>
    );
};
const MakeWeatherReport = ({
    curWeatherData,
    dayWeatherData,
    displayInfo,
}: {
    curWeatherData: WeatherReportDataType;
    dayWeatherData: DailyWeatherDataType;
    displayInfo: DisplayInfoType;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    let reportLabel, reportInfo;
    const HeaderDisplay = () => {
        const headerData = curWeatherData.dataset.shift();
        if (headerData == undefined) {
            reportLabel = "Error";
            reportInfo = "Undefined";
        } else {
            reportLabel = headerData.label;
            reportInfo = headerData.info;
        }
        return (
            <>
                <Typography
                    className="reportTypography"
                    variant="h3"
                    align="center"
                >
                    {moment(curWeatherData.time, "X").format("dddd")}
                </Typography>
                <Typography
                    className="reportTypography"
                    variant="h4"
                    align="center"
                >
                    {moment(curWeatherData.time, "X").format("MMM Do")}
                </Typography>
                <Typography
                    className="reportTypography"
                    variant="h5"
                    align="center"
                >
                    {reportLabel} {reportInfo}
                </Typography>
            </>
        );
    };
    const ExtendedDisplay = curWeatherData.dataset.map((elem, index, data) => {
        return (
            <Typography
                key={index}
                className="reportTypography"
                variant="h5"
                align="center"
                style={{ listStyle: "none" }}
            >
                {`${elem.label} ${elem.info}`}
            </Typography>
        );
    });
    return (
        <Box
            className="dailyReportBox"
            style={{ flexGrow: "1", height: "100%" }}
        >
            <Paper
                className="dailyReport"
                style={{
                    background:
                        "linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.3) 25.79%)",
                    height: "100%",
                    //filter: "blur(3px)",
                }}
                onClick={() => {
                    console.log("click");
                    setIsExpanded(!isExpanded);
                }}
                sx={[
                    {
                        "&:hover": {
                            color: "red",
                            backgroundColor: "white",
                            margin: "0px",
                        },
                    },
                ]}
            >
                <HeaderDisplay />
                <Divider />
                {ReportPanels(dayWeatherData)}
                {/* {isExpanded ? (
                    <ul style={{ padding: "0", listStyle: "none" }}>
                        {ExtendedDisplay}
                    </ul>
                ) : undefined} */}
            </Paper>
            <Box
                className="dailyReportImage"
                style={{
                    backgroundImage: `url(${displayInfo.imageSrc})`,
                    height: "100%",
                    backgroundSize: "cover",
                }}
            />
        </Box>
    );
};

export const DailyWeatherReports = ({
    WeatherData,
}: {
    WeatherData: DailyWeatherDataType[];
}) => {
    console.log("Generating Daily Reports");
    //console.log(WeatherData);
    const displayInfoArr: DisplayInfoType[] = [];
    const [reportIndex, setReportIndex] = useState(0);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setReportIndex(value);
    };
    const reportsData: WeatherReportDataType[] = WeatherData.map(
        (elem, index) => {
            const date = elem.dt;
            const weatherCondition =
                elem.weather && elem.weather[0]
                    ? elem.weather[0].main
                    : undefined;
            const imageSrc = (str: string | undefined) => {
                switch (str) {
                    case "Thunderstorm":
                        return "/weather-images/id2xx.jpg";
                    case "Drizzle":
                        return "/weather-images/id3xx-5xx.jpg";
                    case "Rain":
                        return "/weather-images/id3xx-5xx.jpg";
                    case "Snow":
                        return "/weather-images/id6xx.jpg";
                    case "Clear":
                        return "/weather-images/id800.jpg";
                    case "Clouds":
                        return "/weather-images/id80x.jpg";
                    default:
                        return "/weather-images/errImg.jpg";
                }
            };
            if (elem.weather && elem.weather[0]) {
                displayInfoArr.push({
                    imageSrc: imageSrc(weatherCondition),
                    effects: "inset 0 0 0 1000px rgba(116, 160, 229, .3)",
                    backgroundMask:
                        "linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.3) 25.79%)",
                });
            }
            /* const reportData: ReportInfo[] = [];
		for (const [key, value] of Object.entries(elem)) {
			reportData.push({
				label: `${key}`,
				info: `${value}`,
			});
		} */
            const reportData: ReportInfo[] = [
                {
                    label: "Temperature: ",
                    info: `${elem.temp.day}`,
                },
                {
                    label: "Weather: ",
                    info: `${weatherCondition || "Error"}`,
                },
                {
                    label: "Chance: ",
                    info: `${elem.pop || "Error"}`,
                },
                {
                    label: "Low: ",
                    info: `${elem.temp.min}`,
                },
                {
                    label: "High: ",
                    info: `${elem.temp.max}`,
                },
                {
                    label: "Feels Like: ",
                    info: `${elem.temp.day}`,
                },
                {
                    label: "Wind Speed: ",
                    info: `${elem.wind_speed}`,
                },
            ];
            //const date = new Date(elem.dt);
            console.log("Date: " + date);
            const curReportData: WeatherReportDataType = {
                time: date.toString(),
                dataset: reportData,
            };

            return curReportData;
        }
    );

    /*     const reports = Object.keys(reportsData).map((elem, index) => (
        <Box
            style={{
                display: "flex",
                flexGrow: "1",
            }}
            key={elem}
        >
            {MakeWeatherReport({
                WeatherData: reportsData[index],
                displayInfo: displayInfoArr[index],
            })}
        </Box>
    )); */
    const reports = Object.keys(reportsData).map((elem, index) => (
        <Box
            /* xs={12} sm={6} md={3} */ style={{
                display: "flex",
                flexGrow: "1",
                height: "90%",
            }}
            key={elem}
        >
            {MakeWeatherReport({
                curWeatherData: reportsData[index],
                dayWeatherData: WeatherData[index],
                displayInfo: displayInfoArr[index],
            })}
        </Box>
    ));
    return (
        <Container
            id="dailyReportsContainer"
            disableGutters={true}
            maxWidth={false}
            style={{ flexGrow: 1, overflow: "auto" }}
        >
            {reports[reportIndex]}
            <Pagination count={8} page={reportIndex} onChange={handleChange} />
        </Container>
    );
};
