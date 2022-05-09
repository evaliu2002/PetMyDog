import React, { useState } from 'react';
import { BsArrowLeftSquare } from "react-icons/bs";
import { useNavigate } from 'react-router';


const SelectedDog = () => {
    const [selectedDog, setSelectedDog] = useState();
    const [ownerName, setOwnerName] = useState("");
    const [dogName, setDogName] = useState("");
    const [dogAge, setDogAge] = useState(0);
    const [dogBreed, setDogBreed] = useState("");
    const [dogLocation, setDogLocation] = useState({longitude: 0, latitude: 0});
    const [userLocation, setUserLocation] = useState({longitude: 0, latitude: 0});
    const [distanceLeft, setDistanceLeft] = useState(0);

    let navigate = useNavigate();


    const back = () => {
        navigate(-1)
    }

    return (
        <div>
            <h3>{ dogName }</h3>

            <h5>{ dogName }'s Location </h5>
            <p>{ distanceLeft }</p>

            <h5>About { ownerName }</h5>
            <p>Age: { dogAge }</p>
            <p>Breed: { dogBreed }</p>

            {/* <img></img> */}

            <button>Go to Dog</button>
        </div>
    );
}

export default SelectedDog;