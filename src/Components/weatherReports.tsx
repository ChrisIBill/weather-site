import { AspectRatio } from "@mui/icons-material";
import { Divider, Drawer, Paper, Skeleton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import Grid2 from "@mui/material/Unstable_Grid2";
import { height } from "@mui/system";
import React, { useEffect, useLayoutEffect, useState } from "react";
import errImg from "../weather-images/errImg.jpg";
import { id2xx } from "../weather-images/id2xx.jpg";

interface DailyWeatherType {
	dt: number;
	temp: {
		day: number;
		min: number;
		max: number;
		night: number;
		eve: number;
		morn: number;
	};
	weather: [
		{
			id: number;
			main: string;
			description: string;
		}
	];
}
interface HourlyWeatherType {
	dt: number;
	temp: number;
	weather: [
		{
			id: number;
			main: string;
			description: string;
		}
	];
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
const MakeDailyReport = ({ dayWeatherData }: { dayWeatherData: DailyWeatherType }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [height, setHeight] = useState(window.innerWidth);
	console.log(height);
	const avgDayTemp: number = kelvinToCelsius(dayWeatherData.temp.day);
	const relTemp = avgDayTemp - 13.9;
	let reportSize = height > 600 ? 600 : height;
	//const [imgSrc, setImgSrc] = useState("../weather-images/");
	let imgSrc = "/weather-images/";
	console.log(imgSrc.concat("id2xx"));
	switch (dayWeatherData.weather[0].main) {
		case "Thunderstorm":
			imgSrc = imgSrc.concat("id2xx.jpg");
			break;
		case "Drizzle":
			imgSrc = imgSrc.concat("id3xx-5xx.jpg");
			break;
		case "Rain":
			imgSrc = imgSrc.concat("id3xx-5xx.jpg");
			break;
		case "Snow":
			imgSrc = imgSrc.concat("id6xx.jpg");
			break;
		case "Clear":
			imgSrc = imgSrc.concat("id800.jpg");
			break;
		case "Clouds":
			imgSrc = imgSrc.concat("id80x.jpg");
			break;
		default:
			imgSrc = imgSrc.concat("errImg.jpg");
	}
	const reportEffects = (temp: number) => {
		if (temp < 10) {
			return `inset 0 0 0 1000px rgba(116, 160, 229, ${Math.abs(temp - 10) * 0.05})`;
			//Apply frosted glass effect
		} else return "";
	};
	useEffect(() => {
		window.addEventListener("resize", (event) => {
			reportSize = window.innerHeight > 600 ? 600 : 200;
			console.log(reportSize);
		});
		return window.removeEventListener("resize", (event) => {
			reportSize = window.innerHeight > 600 ? 600 : 200;
			console.log(reportSize);
		});
	}, [reportSize]);

	//const handleScroll = (event) => {};
	/* useEffect(() => {
		window.addEventListener("scroll", handleScroll);
	}); */
	return (
		<Paper
			className="dailyReport"
			style={{
				boxShadow: reportEffects(avgDayTemp),
				backgroundImage: `url(${process.env.PUBLIC_URL + imgSrc})`,
				height: reportSize,
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
			<></>
			<Typography variant="h5" align="center">
				{kelvinToCelsius(dayWeatherData.temp.day).toFixed(1)} °C
			</Typography>
			{isExpanded ? (
				<>
					<Divider />
					<Typography variant="h6" align="center">
						{kelvinToCelsius(dayWeatherData.temp.min).toFixed(1)} °C
					</Typography>
				</>
			) : undefined}
		</Paper>
	);
};
const LoadDailyReport = (dayWeatherData?: DailyWeatherType) => {
	return dayWeatherData ? (
		<MakeDailyReport dayWeatherData={dayWeatherData} />
	) : (
		<Skeleton variant="rectangular" height={600} width={400} />
	);
};
export const DailyWeatherReports = ({ dailyWeatherData }: { dailyWeatherData: DailyWeatherType[] }) => {
	console.log(dailyWeatherData);
	const reports = Object.keys(dailyWeatherData).map((elem, index) => (
		<Grid2 xs={12} sm={6} md={3} key={elem}>
			{LoadDailyReport(dailyWeatherData[index])}
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
