import { useState } from "react";
import GoogleMapsAPIKey from "../lib/APIKeys";
import { CoordinatesType } from "../lib/interfaces";
//import "./testData";
type Coords = [number, number] | undefined;
type locType = "Zip Code" | "City" | "Coordinates";

//const apiSrc = `https://maps.googleapis.com/maps/api/geocode/json?address=${loc}&key=${GoogleMapsAPIKey}`;
const apiSrc = `testData.json`;

export const getGeolocation = new Promise<CoordinatesType>((resolve, reject) => {
	function success(pos: GeolocationPosition) {
		const crd = pos.coords;

		console.log("Successfully obtained user location");
		console.info("Received coords object: " + crd);
		resolve({
			latitude: pos.coords.latitude,
			longitude: pos.coords.longitude,
			accuracy: pos.coords.accuracy,
		});
	}

	function error(err: GeolocationPositionError) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
		reject("User denied");
	}

	if ("geolocation" in navigator) {
		console.log("Location Available");
	} else {
		console.log("Location Not Available");
		reject("Location Not Available");
	}
	const options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};
	navigator.geolocation.getCurrentPosition(success, error, options);
});

export const getGeocode = async (loc?: any) => {
	const usrCoords: [any, any] = ["", ""];
	let apiCallError = null;
	let isLoaded = false;
	usrCoords.pop();
	usrCoords.pop();

	return await fetch(apiSrc)
		.then((res) => res.json())
		.then(
			(result) => {
				isLoaded = true;
				usrCoords.push(result.results[0].geometry.location.lat, result.results[0].geometry.location.lng);
				console.log(usrCoords);
				console.log("Google Lat translation" + usrCoords[0]);
				console.log("Google Lat translation" + usrCoords[1]);
				return usrCoords;
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
				console.log(error);
				isLoaded = true;
				apiCallError = error;
				return;
			}
		);
};
export async function getCoords(loc?: string) {
	return Promise.any([getGeocode(loc), getGeolocation]).then((value) => console.log("Value: " + value));
}
