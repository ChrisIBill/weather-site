export default function Geolocator() {
    //const loc: [number, number] = [null, null];

    if ("geolocation" in navigator) {
        console.log("Location Available");
    } else {
        console.log("Location Not Available");
        return null;
    }
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    function success(pos: GeolocationPosition) {
        const crd = pos.coords;

        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        return crd;
    }

    function error(err: GeolocationPositionError) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    const loc = navigator.geolocation.getCurrentPosition(
        success,
        error,
        options
    );

    return loc;
}
