import React, { useState } from 'react';
import { BsArrowLeftSquare } from "react-icons/bs";
import { useNavigate } from 'react-router';

const OwnerProfile = () => {
    const [ownerName, setOwnerName] = useState("Bob");
    const [dogProfiles, setDogProfiles] = useState([]);

    let navigate = useNavigate();

    const createDogProfile = () => {
        navigate("/create-dog-profile")
    }

    const findDogs = () => {
        navigate("/find-dogs")
    }

    return (
        <div className='ownerProfile'>
            <h1>{ownerName}'s Profile</h1>
            {/*{ dogProfiles }*/}
            <button onClick={findDogs}>Go for a Walk</button>
            <button onClick={createDogProfile}>Add More</button>
        </div>
    );
}

export default OwnerProfile;