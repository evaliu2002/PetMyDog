import React, { useState, useEffect } from 'react';
import {Circle, GoogleMap, Marker, useJsApiLoader, DirectionsRenderer} from '@react-google-maps/api';

// styling for map
const containerStyle = {
    width: "auto",
    height: "600px"
    // minWidth: "200px",
    // width: "50%",
    // minHeight: "200px",
    // height: "80%",
};

/**
 * A map which holds the position of the current user. Displays the user's coords
 * with a marker and a circle indicating the 500m radius around the user.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Map(prop) {
    const WAIT_15_SECONDS = 1000 * 15;
    const OTHER_USER_LOCATION_URL = "https://localhost:4567/getOtherUserLocation";

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyB3i1uDupa_wlGSIrkv9Wfzj0Wfhx4dgxA"
    })

    // Creating current user location state, that user location state, and path to that user.
    const [thisUser, setThisUser] = useState({
        lat: 47.659057,
        lng: -122.308705
    });
    const [thatUser, setThatUser] = useState();
    const [dir, setDir] = useState();

    const updateThatUserLocation = () => {
        if (prop.thatUser) {
            fetch(OTHER_USER_LOCATION_URL, {
                cache: 'no-cache',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(checkStatus)
                .then(async (response) => {
                    setThatUser(await response.json());
                })
                .catch(() => {alert("Owner user's location is unavailable!")});
        }
    };

    /**
     * Get back-end response
     * @param response
     * @returns {Promise<never>|*}
     */
    const checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300 || response.status === 0) {
            return response;
        } else {
            return Promise.reject(new Error(response.status + ": " + response.statusText));
        }
    };

    const updateThisUserLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            setThisUser({lat, lng});
        });
    }
    // Getting the position of the current user
    useEffect(() => {
        updateThisUserLocation();
        updateThatUserLocation();
        setInterval(updateThisUserLocation, WAIT_15_SECONDS);
        setInterval(updateThatUserLocation, WAIT_15_SECONDS);
    }, []);

    useEffect(() => {
        if (thatUser && isLoaded) {
            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: thisUser,
                    destination: thatUser,
                    travelMode: window.google.maps.TravelMode.WALKING
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDir(result);
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            );
        }
    }, [thisUser, thatUser]);

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(thisUser)
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={3000}
            center={thisUser}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
        <Marker
            key="1"
            position={thisUser}
        />
        <Circle
            strokeColor={"#FF0000"}
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor={"#FF0000"}
            fillOpacity={0.35}
            center={{lat: thisUser.lat, lng: thisUser.lng}}
            radius={300}
        />
        <DirectionsRenderer
            directions={dir}
        />
        </GoogleMap>
    ) : <></>
}
export default React.memo(Map)
