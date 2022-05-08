import React, { useState } from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from 'react-router';
import Map from '../map/Map';
import "./FindDogs.css";

const GET_NEARBY_USER_URL = "http://localhost:4567/getNearbyUser";
const UPDATE_EVERY = 15 * 1000;
let userUID = [];

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300 || response.status === 0) {
        return response.text();
    } else {
        return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
};

const updateNearbyUsers = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let locationInfo = {lat, lng};
        fetch(GET_NEARBY_USER_URL, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(locationInfo) // body data type must match "Content-Type" header
        })
            .then(checkStatus)
            .then(() => {console.log("Updated location: lat: " + lat + " lng: " + lng);})
            .catch(() => {console.log("Location not updated")});
    });
};

// makeRequest = async () => {
//     try {
//         let response = await fetch("http://localhost:4567/campusBuildings");
//         if (!response.ok) {
//             alert("The status is wrong! Expected: 200, Was: " + response.status);
//             return; // Don't keep trying to execute if the response is bad.
//         }
//         let text = (await response.json()) as string[];
//         let buildings = [];
//         for (let building of text) {
//             buildings.push([building[0].toString(), building[1].toString()])
//         }
//         this.setState({
//             buildingNames: buildings
//         });
//     } catch (e) {
//         // alert("There was an error contacting the server.");
//         console.log(e);
//     }
// };

userUID = updateNearbyUsers();

setInterval(updateNearbyUsers, UPDATE_EVERY);
updateNearbyUsers();

const FindDogs = () => {
    let navigate = useNavigate();
    const ownerProfile = () => {
        navigate("owner-profile")
    }
    const selectedDog = () => {
        navigate("selected-dog")
    }
    const dogRequests = () => {
        navigate("dog-requests")
    }
    const [userLocation, setUserLocation] = useState({longitude: 0, latitude: 0});

    const [dogsNearby, setDogsNearby] = useState([]);

    return (
        <div className='findDogs'>
            <Map />
            <button onClick={dogRequests}>Petter Mode</button>
            <BsFillPersonFill onClick={ownerProfile}/>
            <h4>Nearby Pets</h4>
            { dogsNearby }
            {/* jsx map over each dog object in dogsNearby array
            and then display each object somehow... will figure that out later */}
            {/* jsx key attribute for each dog? */}
        </div>
    );
}

export default FindDogs;