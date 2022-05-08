import React, { useState } from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from 'react-router';
import "./FindDogs.css";
import MapView from "../mapview/MapView";

const FindDogs = () => {
    let navigate = useNavigate();

    const ownerProfile = () => {
        navigate("/owner-profile")
    }

    const selectedDog = () => {
        navigate("/selected-dog")
    }

    const dogRequests = () => {
        navigate("/dog-requests")
    }

    const [userLocation, setUserLocation] = useState({longitude: 0, latitude: 0});

    const [dogsNearby, setDogsNearby] = useState([]);

    return (
        <div className='findDogs'>
            <button onClick={() => <MapView currentPage={"/dog-requests"}/>}>Petter Mode</button>
            <BsFillPersonFill onClick={"/owner-profile"}/>
            <h4>Nearby Pets</h4>
            { dogsNearby }
            {/* jsx map over each dog object in dogsNearby array
            and then display each object somehow... will figure that out later */}
            {/* jsx key attribute for each dog? */}
        </div>
    );
}

export default FindDogs;