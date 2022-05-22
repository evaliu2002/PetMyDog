import React, { useState } from 'react';
import { BsFillTelephoneFill, BsFillPinMapFill, BsArrowUpCircleFill } from "react-icons/bs";
import {useNavigate} from "react-router";

const NavOwner = (props) => {
    const OTHER_USER_LOCATION_URL = "https://localhost:4567/getOtherUserLocation";
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
                props.setThatUserLocation(await response.json());
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
            <button onClick={ () => navigate("/map-view/dog-requests") }>Refresh location and suggested path.</button>
            <button onClick={ () => navigate("/owner-profile") }>Refresh location and suggested path.</button>

            <h3> { props.thatUser.username } is coming to you</h3>

            <h5> Visitor's contact: </h5> <br />

            <BsFillTelephoneFill />
            <h4> { props.thatUser.phone } </h4>
            <h4> { props.thatUser.email } </h4>

            <BsFillPinMapFill />
            <p>
                Location: You will see a Pin on map and path to that Pin when the visitor's location is available.
                It is possible for the visitor's location to be unavailable. If you do not want to wait until it becomes
                available, go back to request list and cancel this meet up.
            </p>
            <button onClick={ updateThatUserLocation }>Refresh location and suggested path.</button>
        </div>
    );
}

export default NavOwner;