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
function Map(props) {
    const WAIT_15_SECONDS = 1000 * 15;

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyB3i1uDupa_wlGSIrkv9Wfzj0Wfhx4dgxA"
    })

    // Creating current user location state, that user location state, and path to that user.
    const [thisUser, setThisUser] = useState({
        lat: 47.659057,
        lng: -122.308705
    });
    const [dir, setDir] = useState();

    const updateThisUserLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            setThisUser({lat, lng});
        });
    }

    /**
     * Update the marker and circle depending on the user's current location
     */
    const updateMarkerCircle = () => {
        const marker = new window.google.maps.Marker({
            map: map,
            position: new window.google.maps.LatLng(thisUser),
        });
        const circle = new window.google.maps.Circle({
            map: map,
            radius: 500 //500 km
        });
        circle.bindTo('center', marker, 'position');
        map.fitBounds(circle.getBounds());
    }

    // Getting the position of the current user
    useEffect(() => {
        updateThisUserLocation();
        setInterval(updateThisUserLocation, WAIT_15_SECONDS);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            updateMarkerCircle();
            if (props.thatUserLocation && props.thatUser) {
                const directionsService = new window.google.maps.DirectionsService();
                directionsService.route(
                    {
                        origin: thisUser,
                        destination: props.thatUserLocation,
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
        }
    }, [thisUser]);

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={thisUser}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
        <DirectionsRenderer
            directions={dir}
        />
        </GoogleMap>
    ) : <></>
}
export default React.memo(Map)
