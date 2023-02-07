import { AspectRatio } from "@mui/icons-material";
import {
    Box,
    Container,
    Divider,
    Drawer,
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
const WeatherDataPanel = () => {
    return (
        <Box
            style={{
                height: "100px",
                width: "100px",
                color: "white",
                backgroundColor: "white",
            }}
        ></Box>
    );
};
const WeatherChartsPanel = () => {
    return (
        <Box
            style={{
                height: "100px",
                width: "100px",
                color: "white",
                backgroundColor: "white",
            }}
        ></Box>
    );
};
const ReportPanels = () => {
    return (
        <Container>
            <WeatherChartsPanel />
            <WeatherDataPanel />
        </Container>
    );
};
const MakeWeatherReport = ({
    WeatherData,
    displayInfo,
}: {
    WeatherData: WeatherReportDataType;
    displayInfo: DisplayInfoType;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    let reportLabel, reportInfo;
    const HeaderDisplay = () => {
        const headerData = WeatherData.dataset.shift();
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
                    {moment(WeatherData.time, "X").format("dddd")}
                </Typography>
                <Typography
                    className="reportTypography"
                    variant="h4"
                    align="center"
                >
                    {moment(WeatherData.time, "X").format("MMM Do")}
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
    const ExtendedDisplay = WeatherData.dataset.map((elem, index, data) => {
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
                <ReportPanels />
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
                    info: `${elem.windSpeed}`,
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
                height: "100%",
            }}
            key={elem}
        >
            {MakeWeatherReport({
                WeatherData: reportsData[index],
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
            {reports[0]}
        </Container>
    );
};
