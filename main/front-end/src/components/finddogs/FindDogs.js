import React, {useEffect, useState} from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from 'react-router';
import "./FindDogs.css";
import MapView from "../mapview/MapView";

const FindDogs = () => {
    let navigate = useNavigate();
    const ownerProfile = () => {
        navigate("/owner-profile")
    }
    const selectedDog = (e) => {
        navigate("/map-view/selected-dog/" + e.target.id);
    }
    const dogRequests = () => {
        navigate("/dog-requests")
    }
    const [userLocation, setUserLocation] = useState({longitude: 0, latitude: 0});

    const [dogsNearby, setDogsNearby] = useState([]);

    const LOCATION_URL = "http://localhost:4567/updateLocation";
    const UPDATE_EVERY = 15 * 1000;

    const updateLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            let locationInfo = {lat, lng};
            fetch(LOCATION_URL, {
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

    const checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300 || response.status === 0) {
            return response;
        } else {
            return Promise.reject(new Error(response.status + ": " + response.statusText));
        }
    };

    // setInterval(updateLocation, UPDATE_EVERY);
    // updateLocation();

    const GET_NEARBY_USER_URL = "http://localhost:4567/getNearbyUser";
    let displayDogs = [];
    const UPDATE_EVERY_MIN = 60 * 1000;

    const GET_USER_PROFILE_URL = "http://localhost:4567/profile";

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
                // .then(checkStatus)
                .then(async (response) => {
                    // let uidArr = (await response.json());
                    let uidArr = ["101836349121923215589"];
                    displayDogs = [];
                    let fetches = [];
                    for (let i = 0; i < uidArr.length; i++) {
                        let currentFetch = fetch(GET_USER_PROFILE_URL + "?uid=" + uidArr[i], {
                            // credentials: 'include',
                        })
                            .then(checkStatus)
                            // .then(console.log)
                            .then(async (response) => {
                                let userObj = await response.json();
                                console.log(userObj);
                                displayDogs = displayDogs.concat(userObj.dogs);
                                console.log(userObj.dogs);
                            })
                        fetches.push(currentFetch);
                    }
                    await Promise.all(fetches);
                    setDogsNearby(displayDogs);
                    console.log("Dogs displayed: " + JSON.stringify(displayDogs));
                })
                // .catch(() => {console.log("Location not updated")});
        });
    };

    useEffect(updateNearbyUsers, []);
// setInterval(updateNearbyUsers, UPDATE_EVERY_MIN);
//     updateNearbyUsers();

    return (
        <div className='findDogs'>
            <button onClick={() => <MapView currentPage={"/dog-requests"}/>}>Petter Mode</button>
            <BsFillPersonFill onClick={"/owner-profile"}/>
            <h4>Nearby Pets</h4>
            {dogsNearby.map(dog => <div id={dog.did} onClick={selectedDog}>{dog.name}</div>)}

        </div>
    );
}

export default FindDogs;