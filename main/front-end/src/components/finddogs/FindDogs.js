import React, {useEffect, useState} from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from 'react-router';
import "./FindDogs.css";

const FindDogs = ({changedDogObj}) => {
    let navigate = useNavigate();

    const ownerProfile = () => {
        navigate("/owner-profile")
    }

    const selectedDog = async (e) => {
        await changedDogObj(JSON.parse(e.target.id));
        navigate("/map-view/selected-dog/" + e.target.id);
    }

    const dogRequests = () => {
        navigate("/map-view/dog-requests")
    }
    const [userLocation, setUserLocation] = useState({longitude: 0, latitude: 0});

    const [dogsNearby, setDogsNearby] = useState([]);

    const LOCATION_URL = "http://petmydog.fun/updateLocation";
    const UPDATE_EVERY = 15 * 1000;

    const updateLocation = () => {
        fetch("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBmy8ljB-id0qugtedezLUAc5o07UO8uwE", {
            method: 'POST',
        }).then((res) => res.json())
            .then((position) => {
            // let lat = position.coords.latitude;
            // let lng = position.coords.longitude;
            let locationInfo = position.location;
            fetch(LOCATION_URL, {
                method: 'POST',
                // mode: 'no-cors',
                cache: 'no-cache',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(locationInfo) // body data type must match "Content-Type" header
            })
                .then(checkStatus)
                // .then(() => {console.log("Updated location: lat: " + lat + " lng: " + lng);})
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


    const GET_NEARBY_USER_URL = "http://petmydog.fun/getNearbyUser";
    let displayDogs = [];
    const UPDATE_EVERY_MIN = 60 * 1000;

    const GET_USER_PROFILE_URL = "http://petmydog.fun/profile";

    const updateNearbyUsers = () => {
        fetch("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBmy8ljB-id0qugtedezLUAc5o07UO8uwE", {
            method: 'POST',
        }).then((res) => res.json())
            .then((position) => {
            // let lat = position.coords.latitude;
            // let lng = position.coords.longitude;
            let locationInfo = position.location;
            fetch(GET_NEARBY_USER_URL, {
                method: 'POST',
                // mode: 'no-cors',
                cache: 'no-cache',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(locationInfo) // body data type must match "Content-Type" header
            })
                // .then(checkStatus)
                .then(async (response) => {
                    let uidArr = (await response.json());
                    // let uidArr = ["101836349121923215589"];
                    displayDogs = [];
                    let fetches = [];
                    for (let i = 0; i < uidArr.length; i++) {
                        let currentFetch = fetch(GET_USER_PROFILE_URL + "?uid=" + uidArr[i], {
                            credentials: 'include',
                        })
                            .then(checkStatus)
                            // .then(console.log)
                            .then(async (response) => {
                                let userObj = await response.json();
                                console.log(userObj);
                                let userDog = userObj.dogs;
                                for (let i = 0; i < userDog.length; i++) {
                                    userDog[i].ownerID = userObj.uid;
                                }
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

    useEffect(() => {
        console.log("finding dogs");
        updateNearbyUsers();
        updateLocation();
        setInterval(updateNearbyUsers, UPDATE_EVERY);
        setInterval(updateLocation, UPDATE_EVERY);
    }, []);

    return (
        <div className='findDogs'>
            <button onClick={dogRequests}>Owner Mode</button>
            <BsFillPersonFill onClick={ownerProfile}/>
            <h4>Nearby Pets</h4>
            {dogsNearby.map(dog => <div id={JSON.stringify(dog)} onClick={selectedDog}>{dog.name}</div>)}
        </div>
    );
}

export default FindDogs;