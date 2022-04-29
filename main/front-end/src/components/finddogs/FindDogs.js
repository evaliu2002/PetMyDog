import React from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import useHistory from "react-router-dom";

const dogsNearby = [];

export const FindDogs = () => {
    const navigate = useHistory();

    const ownerProfile = () => {
        navigate("./ownerprofile/OwnerProfile")
    }
    return (
        <div>
            <button>Petter Mode</button>
            <BsFillPersonFill onClick={ownerProfile}/>
            <h4>Nearby Pets</h4>
            { dogsNearby }
            {/* jsx map over each dog object in dogsNearby array
            and then display each object somehow... will figure that out later */}
            {/* jsx key attribute for each dog? */}
        </div>
    );
}