import React from 'react';
import { BsFillPersonFill } from "react-icons/bs";

const dogsNearby = [];

export class FindDogs extends React.Component {
    render() {
        return (
            <div>
                <button>Petter Mode</button>
                <BsFillPersonFill />
                <h4>Nearby Pets</h4>
                { dogsNearby }
                {/* jsx map over each dog object in dogsNearby array 
                and then display each object somehow... will figure that out later */}
                {/* jsx key attribute for each dog? */}
            </div>
        );
    }
}