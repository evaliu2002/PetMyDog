import React, { useState, useEffect } from 'react';
import {Circle, GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';

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
    // Creating current user location state
    const [thisUser, setThisUser] = useState({
        lat: -3.745,
        lng: -38.523
    });

    const [thatUser, setThatUser] = useState(props.thatUser);

    // Getting the position of the current user
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            setThisUser({lat, lng});
            console.log({lat, lng});
        });
    }, []);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBmy8ljB-id0qugtedezLUAc5o07UO8uwE"
    })

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
        </GoogleMap>
    ) : <></>
}
export default React.memo(Map)
