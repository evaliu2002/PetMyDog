import React, {useEffect, useState} from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from 'react-router';
import "./FindDogs.css";

const FindDogs = ({changedDogObj}) => {
    // useNavigate for event handling to other web pages
    let navigate = useNavigate();
    const ownerProfile = () => {
        navigate("/owner-profile")
    }
    const selectedDog = async (e) => {
        await changedDogObj(JSON.parse(e.target.id));
        navigate("/map-view/selected-dog");
    }
    const dogRequests = () => {
        navigate("/map-view/dog-requests")
    }

    // User location state
    const [userLocation, setUserLocation] = useState({longitude: 0, latitude: 0});

    // Dogs Nearby state
    const [dogsNearby, setDogsNearby] = useState([]);

    const LOCATION_URL = process.env.REACT_APP_BASE_URL + "/updateLocation";
    const UPDATE_EVERY = 15 * 1000;

    /**
     * Update User Location from calling back-end endpoint
     */
    const updateLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            let locationInfo = {lat, lng};
            fetch(LOCATION_URL, {
                method: 'POST',
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

    /**
     * Get back-end response
     * @param response
     * @returns {Promise<never>|*}
     */
    const checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300 || response.status === 0) {
            return response;
        } else {
            return Promise.reject(new Error(response.status + ": " + response.statusText));
        }
    };

    // setInterval(updateLocation, UPDATE_EVERY);
    // updateLocation();

    const GET_NEARBY_USER_URL = process.env.REACT_APP_BASE_URL + "/getNearbyUser";
    let displayDogs = [];
    const UPDATE_EVERY_MIN = 60 * 1000;

    const GET_USER_PROFILE_URL = process.env.REACT_APP_BASE_URL + "/getUserProfile";

    /**
     * Update nearby users from calling back-end endpoint
     */
    const updateNearbyUsers = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            let locationInfo = {lat, lng};
            fetch(GET_NEARBY_USER_URL, {
                method: 'POST',
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
                                let userDog = userObj.dogs;
                                for (let i = 0; i < userDog.length; i++) {
                                    userDog[i].ownerID = userObj.uid;
                                }
                                displayDogs = displayDogs.concat(userObj.dogs);
                            })
                        fetches.push(currentFetch);
                    }
                    await Promise.all(fetches);
                    setDogsNearby(displayDogs);
                })
                // .catch(() => {console.log("Location not updated")});
        });
    };

    useEffect(() => {
        updateNearbyUsers();
        updateLocation();
        setInterval(updateNearbyUsers, UPDATE_EVERY);
        setInterval(updateLocation, UPDATE_EVERY);
    }, [])

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