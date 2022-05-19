import React, { useState } from 'react';
import { BsFillTelephoneFill, BsFillPinMapFill, BsArrowUpCircleFill } from "react-icons/bs";

const NavUser = () => {
    // List of possible states
    const [selectedDog, setSelectedDog] = useState();
    const [userName, setUserName] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [ownerPhoneNum, setOwnerPhoneNum] = useState("");
    const [dogName, setDogName] = useState("");
    const [dogLocation, setDogLocation] = useState({longitude: 0, latitude: 0});
    const [userLocation, setUserLocation] = useState({longitude: 0, latitude: 0});
    const [distanceLeft, setDistanceLeft] = useState(0);

    const OTHER_USER_LOCATION_URL = "https://localhost:4567/getOtherUserLocation";

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

    const updateThatUserLocation = () => {
        fetch(OTHER_USER_LOCATION_URL, {
            method: 'GET',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(checkStatus)
            .then(async (response) => {
                console.log(await response.json());
            })
            .catch(() => {console.log("Location not updated")});
    };

    return (
        <div>
            {/* map */}
            <h3> { userName } is heading to { ownerName }</h3>

            <h5> { ownerName } </h5> <br />
            <p> Dog Owner </p>

            <BsFillTelephoneFill />
            <h4> { ownerPhoneNum } </h4>

            <BsFillPinMapFill />
            <p> Location of { dogName }:
            { dogLocation.longitude }, { dogLocation.latitude }</p>

            <BsArrowUpCircleFill />
            <p> Distance Left: { distanceLeft } </p>

            <button>Cancel the Meeting</button>
        </div>
    );
}

export default NavUser;