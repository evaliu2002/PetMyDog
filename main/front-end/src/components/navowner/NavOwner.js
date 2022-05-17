import React, { useState } from 'react';
import { BsFillTelephoneFill, BsFillPinMapFill, BsArrowUpCircleFill } from "react-icons/bs";

const NavOwner = () => {
    // List of possible needed states
    const [selectedDog, setSelectedDog] = useState();
    const [userName, setUserName] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [userPhoneNum, setUserPhoneNum] = useState("");
    const [dogName, setDogName] = useState("");
    const [dogLocation, setDogLocation] = useState({longitude: 0, latitude: 0});
    const [userLocation, setUserLocation] = useState({longitude: 0, latitude: 0});
    const [distanceLeft, setDistanceLeft] = useState(0)

    return (
        <div>
            {/* map */}
            <h3> { ownerName } is heading to { userName }</h3>

            <h5> { userName } </h5> <br />
            <p> Dog Petter </p>

            <BsFillTelephoneFill />
            <h4> { userPhoneNum } </h4>

            <BsFillPinMapFill />
            <p> Location of { dogName }:
                { dogLocation.longitude }, { dogLocation.latitude }</p>

            <BsArrowUpCircleFill />
            <p> Distance Left: { distanceLeft } </p>

            <button>Cancel the Meeting</button>
        </div>
    );
}

export default NavOwner;