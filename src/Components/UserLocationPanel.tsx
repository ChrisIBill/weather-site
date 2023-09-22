import {
	Backdrop,
	Divider,
	FormControl,
	FormControlLabel,
	FormGroup,
	Input,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	TextField,
	Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { ChangeEvent, CSSProperties, useState } from "react";
import { getCoords, getGeocode, getGeolocation } from "./geolocator";

import ExampleSearchBox from "./autocomplete";
//import Geolocator from "./geolocator";
/* interface ChildProps {
    onEnterKey: (e: {    keyCode: number;}, loc: any) => void
    isActive: boolean;
} */

type Coords = [number, number] | undefined;

const LOCATION_TYPES = ["Zip Code", "City", "Coordinates"];
type locType = (typeof LOCATION_TYPES)[number]; //"Zip Code" | "City" | "Coordinates";

/* const UserLocationPanel = ({
	onEnterKey,
	value,
	isActive,
}: {
	onEnterKey: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
	value: coords;
	isActive: boolean;
    }) => { */

const inputStyle: CSSProperties = {
	boxSizing: `border-box`,
	border: `1px solid transparent`,
	width: `240px`,
	height: `32px`,
	padding: `0 12px`,
	borderRadius: `3px`,
	boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
	fontSize: `14px`,
	outline: `none`,
	textOverflow: `ellipses`,
	position: "absolute",
	top: "10px",
	right: "10px",
};

const UserLocationPanel = ({ submitCoords, isActive }: { submitCoords: any; isActive: boolean }) => {
	const [isOpen, setIsOpen] = useState(true);
	const [addressType, setAddressType] = useState<locType>("Zip Code");
	const [userAddress, setUserAddress] = useState<string>("");
	const [zipCode, setZipCode] = useState<string>("75230");
	const [city, setCity] = useState<string>("");
	const [isInputError, setIsInputError] = useState<boolean>(false);
	const [isValid, setIsValid] = useState<boolean>(false);

	const zipCodeRegEx = /(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/;

	const handleEnterKey = async (e: { keyCode: number }) => {
		if (e.keyCode == 13) {
			if (zipCodeRegEx.test(zipCode)) {
				setIsInputError(false);
				getGeocode(zipCode).then((value) => submitCoords(value));
				//setIsValid(true);
			} else {
				setIsInputError(true);
			}
		}
	};

	const handleChange = (e) => {
		const regex = /^[0-9\b]+$/;
		if (e.target.value === "" || regex.test(e.target.value)) {
			setZipCode(e.target.value);
		}
		if (e.keyCode == 13) {
			if (zipCodeRegEx.test(zipCode)) {
				setIsInputError(false);
				getGeocode(zipCode).then((value) => submitCoords(value));
				//setIsValid(true);
			} else {
				setIsInputError(true);
			}
		}
	};

	return (
		<Backdrop
			//onSubmit={handleEnterKey}
			sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={isActive}
		>
			<Container maxWidth="sm">
				<Paper elevation={24} sx={{ pt: 2 }}>
					<Typography variant="h5" align="center">
						Location Data Needed
					</Typography>
					<Divider />
					<Typography align="center">Please enable location services</Typography>
					<br />
					<Typography align="center">Or Search by Location</Typography>
					<br />
					<FormGroup row={true} sx={{ alignItems: "center", justifyContent: "center" }}>
						<Typography align="center" sx={{ width: 1 / 3 }}>
							Enter your
						</Typography>
						<FormControl sx={{ width: 1 / 3 }} size="small">
							<TextField
								id="zipcode-input"
								label="Zip Code"
								variant="outlined"
								size="small"
								inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
								onChange={(e) => handleChange(e)}
								value={zipCode}
							/>
						</FormControl>
						{/*<FormControl sx={{ width: 1 / 3 }} size="small">
							<ExampleSearchBox styles={{ container: inputStyle }} />
							<Select
								value={addressType}
								onChange={(event: SelectChangeEvent) => {
									setAddressType(event.target.value);
								}}
							>
								<MenuItem value={"City"}>City</MenuItem>
								<MenuItem value={"Zip Code"}>Zip Code</MenuItem>
							</Select>
						</FormControl>*/}
					</FormGroup>
					{/* <AppBar>Location Data Needed</AppBar> */}
				</Paper>
			</Container>
		</Backdrop>
	);
};

export default UserLocationPanel;
