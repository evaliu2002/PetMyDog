import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const OwnerProfile = () => {
    const [ownerName, setOwnerName] = useState("Bob");
    const [dogProfiles, setDogProfiles] = useState([]);

    let navigate = useNavigate();

    const createDogProfile = () => {
        navigate("create-dog-profile")
    }

    return (
        <div className='ownerProfile'>
            <h1>{ownerName}'s Profile</h1>
            {/*{ dogProfiles }*/}
            <button>Go for a Walk</button>
            <button onClick={createDogProfile}>Add More</button>
        </div>
    );
}

export default OwnerProfile;