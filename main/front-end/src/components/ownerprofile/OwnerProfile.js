import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const OwnerProfile = () => {
    const [dogProfiles, setDogProfiles] = useState([]);

    return (
        <div>
            { dogProfiles }
        </div>
    );
}