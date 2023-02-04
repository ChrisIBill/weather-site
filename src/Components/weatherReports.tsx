import { AspectRatio } from "@mui/icons-material";
import { Divider, Drawer, Paper, Skeleton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import Grid2 from "@mui/material/Unstable_Grid2";
import { height } from "@mui/system";
import moment from "moment";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { JsxElement } from "typescript";
import { DailyWeatherDataType, ReportInfo, WeatherDataType, WeatherReportDataType } from "../lib/interfaces";
import errImg from "../weather-images/errImg.jpg";
import { id2xx } from "../weather-images/id2xx.jpg";

interface DisplayInfoType {
	imageSrc: string;
	effects: string;
}

const styles = {
	DailyReportContainer: {
		//minHeight: 300,
		backgroundSize: "cover",
		backgroundPositionY: "50%",
	},
};
/* function getWindowDimensions() {
	const [size, setSize] = useState([0, 0]);
	useLayoutEffect(() => {
		function updateSize() {
			setSize([window.innerWidth, window.innerHeight]);
		}
		window.addEventListener("resize", updateSize);
		updateSize();
		return () => window.removeEventListener("resize", updateSize);
	}, []);
	return size;
} */
const kelvinToCelsius = (temp: number) => {
	return temp - 273.15;
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
	/* const [height, setHeight] = useState(window.innerWidth);
	console.log(height);
	let reportSize = height > 600 ? 600 : height; */
	//const [imgSrc, setImgSrc] = useState("../weather-images/");

	/* const reportEffects = (temp: number) => {
		if (temp < 10) {
			return `inset 0 0 0 1000px rgba(116, 160, 229, ${Math.abs(temp - 10) * 0.05})`;
			//Apply frosted glass effect
		} else return "";
	}; */
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
				<Typography variant="h5" align="center">
					{moment(WeatherData.time, "X").format("dddd")}
				</Typography>
				<Typography variant="h5" align="center">
					{moment(WeatherData.time, "X").format("MMM Do")}
				</Typography>
				<Typography>
					{reportLabel} {reportInfo}
				</Typography>
			</>
		);
	};
	const ExtendedDisplay = WeatherData.dataset.map((elem, index, data) => {
		return <li key={index} style={{ listStyle: "none" }}>{`${elem.label} ${elem.info}`}</li>;
	});
	/* useEffect(() => {
		window.addEventListener("resize", (event) => {
			reportSize = window.innerHeight > 600 ? 600 : 200;
			console.log(reportSize);
		});
		return window.removeEventListener("resize", (event) => {
			reportSize = window.innerHeight > 600 ? 600 : 200;
			console.log(reportSize);
		});
	}, [reportSize]); */

	//const handleScroll = (event) => {};
	/* useEffect(() => {
		window.addEventListener("scroll", handleScroll);
	}); */
	return (
		<Paper
			className="dailyReport"
			style={{
				boxShadow: `inset 0 0 0 1000px rgba(116, 160, 229, .3)`,
				backgroundImage: `url(${displayInfo.imageSrc})`,
				height: "500px",
				backgroundSize: "cover",
				backgroundPositionY: "50%",
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
			{isExpanded ? (
				<>
					<Divider />
					<ul>{ExtendedDisplay}</ul>
				</>
			) : undefined}
		</Paper>
	);
};
/* const LoadDailyReport = (WeatherData: WeatherReportDataType) => {
	return WeatherData ? (
		<MakeWeatherReport WeatherData={WeatherData} displayInfo={displayInfo} />
	) : (
		<Skeleton variant="rectangular" height={600} width={400} />
	);
}; */

export const WeatherReports = ({ WeatherData }: { WeatherData: DailyWeatherDataType[] }) => {
	console.log("Generating Daily Reports");
	//console.log(WeatherData);
	const displayInfoArr: DisplayInfoType[] = [];
	const reportsData: WeatherReportDataType[] = WeatherData.map((elem, index) => {
		const date = elem.dt;
		const weatherCondition = elem.weather && elem.weather[0] ? elem.weather[0].main : undefined;
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
	});

	const reports = Object.keys(reportsData).map((elem, index) => (
		<Grid2 xs={12} sm={6} md={3} key={elem}>
			{MakeWeatherReport({ WeatherData: reportsData[index], displayInfo: displayInfoArr[index] })}
		</Grid2>
	));
	return (
		<Grid2
			sx={{ flexGrow: 1, overflow: "auto", width: "160vw" }}
			container
			wrap={"nowrap"}
			spacing={2}
			disableEqualOverflow
		>
			{reports}
		</Grid2>
	);
	/* return dailyWeatherData.forEach((elem, index) => {
		<li key={`${index}`}>{elem.temp.day}</li>;
	}); */
};

/* export const HourlyWeatherReport = ({ hourlyWeatherData }: { hourlyWeatherData: HourlyWeatherType[] }) => {
	//const temps: number[] = Object.keys(hourlyWeatherData).map((elem, index) => elem.temp);
	//<LineChart width={600} height={300} data=
}; */
