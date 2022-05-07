import React, { useState } from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from 'react-router';
import Map from '../map/Map';

const FindDogs = () => {
    let navigate = useNavigate();

    const ownerProfile = () => {
        navigate("/owner-profile")
    }

    const findDogs = () => {
        navigate("/find-dogs")
    }

    const [userLocation, setUserLocation] = useState({longitude: 0, latitude: 0});

    const [requests, setRequests] = useState([]);

    return (
        <div className='dogRequests'>
            <Map />
            <button onClick={findDogs}>Petter Mode</button>
            <BsFillPersonFill onClick={ownerProfile}/>
            <h4>Petting Requests</h4>
            { requests }
            {/* jsx map over each dog object in dogsNearby array
            and then display each object somehow... will figure that out later */}
            {/* jsx key attribute for each dog? */}
        </div>
    );
}

export default FindDogs;