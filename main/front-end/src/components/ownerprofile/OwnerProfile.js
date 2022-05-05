import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const OwnerProfile = () => {
    const [ownerName, setOwnerName] = useState("");
    const [dogProfiles, setDogProfiles] = useState([]);

    return (
        <div>
            <h1>{ownerName}'s Profile</h1>
            { dogProfiles }
            <button>Go for a Walk</button>
        </div>
    );
}

export default OwnerProfile;