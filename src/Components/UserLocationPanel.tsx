import {
	AppBar,
	Backdrop,
	Box,
	Divider,
	FormControl,
	FormGroup,
	Input,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	Skeleton,
	TextField,
	Typography,
} from "@mui/material";
import { Container, flexbox } from "@mui/system";
import { ChildProcess } from "child_process";
import { ChangeEvent, KeyboardEventHandler, useState } from "react";
import Geolocator from "./geolocator";
/* interface ChildProps {
    onEnterKey: (e: {    keyCode: number;}, loc: any) => void
    isActive: boolean;
} */
type coords = [number, number] | undefined;
type locType = "Zip Code" | "City" | undefined;
/* const UserLocationPanel = ({
	onEnterKey,
	value,
	isActive,
}: {
	onEnterKey: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
	value: coords;
	isActive: boolean;
    }) => { */
const UserLocationPanel = ({ submitCoords, isActive }: { submitCoords: any; isActive: boolean }) => {
	const [isOpen, setIsOpen] = useState(true);
	const [addressType, setAddressType] = useState<string>("Zip Code");
	const [zipCode, setZipCode] = useState<string>("");
	const [city, setCity] = useState<string>("");
	const [isInputError, setIsInputError] = useState<boolean>(false);

	const zipCodeRegEx = /(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/;
	/* const LocationTextField = () => {
        return addressType === "Zip Code" ?
            <TextField error></TextField>
            :
    } */

	const zipCodeTextField = () => {
		return <TextField value={zipCode}></TextField>;
	};
	const handleEnterKey = (e: { keyCode: number }) => {
		if (e.keyCode == 13) {
			if (zipCodeRegEx.test(zipCode)) {
				setIsInputError(false);
				submitCoords(zipCode);
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
					<Typography align="center">OR</Typography>
					<FormGroup row={true} sx={{ alignItems: "center", justifyContent: "center" }}>
						<Typography align="center" sx={{ width: 1 / 3 }}>
							Enter your
						</Typography>
						<FormControl sx={{ width: 1 / 3 }} size="small">
							<InputLabel>{addressType}</InputLabel>
							<Select
								value={addressType}
								onChange={(event: SelectChangeEvent) => {
									setAddressType(event.target.value);
								}}
							>
								<MenuItem value={"City"}>City</MenuItem>
								<MenuItem value={"Zip Code"}>Zip Code</MenuItem>
								{/* <MenuItem value={"Address"}>Address</MenuItem> */}
							</Select>
						</FormControl>
					</FormGroup>
					<FormControl>
						<InputLabel>Zip Code</InputLabel>
						<Input
							error={isInputError}
							onKeyDown={handleEnterKey}
							onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
								setZipCode(event.target.value);
							}}
						></Input>
					</FormControl>
					{/* <AppBar>Location Data Needed</AppBar> */}
				</Paper>
			</Container>
		</Backdrop>
	);
};

export default UserLocationPanel;
