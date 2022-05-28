import React, { useState } from 'react';
import { BsFillTelephoneFill, BsFillPinMapFill, BsArrowUpCircleFill } from "react-icons/bs";
import {useNavigate} from "react-router";

const NavOwner = (props) => {
    const OTHER_USER_LOCATION_URL = process.env.REACT_APP_BASE_URL + "/getOtherUserLocation";
    const navigate = useNavigate();

    const updateThatUserLocation = () => {
        fetch(OTHER_USER_LOCATION_URL, {
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(checkStatus)
            .then(async (response) => {
                let location1 = await response.json();
                let location2 = {lat: location1.lat, lng: location1.lon};
                props.setThatUserLocation(location2);
            })
            .catch(() => {alert("Petter's location is unavailable!")});
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

    return (
        <div>
            <button onClick={ () => navigate("/map-view/find-dogs") }>Find dogs</button>
            <button onClick={ () => navigate("/map-view/dog-requests") }>Requests</button>
            <button onClick={ updateThatUserLocation }>Refresh location and suggested path.</button>

            <h3> { props.thatUser.username } is coming to you</h3>

            <h5> { props.thatUser.username + "'s contact:"} </h5> <br />

            <BsFillTelephoneFill />
            <h4> { props.thatUser.phone ? props.thatUser.phone : "no phone provided" } </h4>
            <h4> { props.thatUser.email ? props.thatUser.email : "no email provided" } </h4>

            <BsFillPinMapFill />
            <p>
                Location: You will see a Pin on map and path to that Pin when the visitor's location is available.
                It is possible for the visitor's location to be unavailable. If you do not want to wait until it becomes
                available, go back to request list and cancel this meet up.
            </p>
        </div>
    );
}

export default NavOwner;