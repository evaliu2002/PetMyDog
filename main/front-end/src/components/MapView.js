import React, {useState} from 'react';
import Map from './Map';
import {Route, useNavigate, Routes} from 'react-router';
import FindDogs from "./FindDogs";
import DogRequests from "./DogRequests";
import NavOwner from "./NavOwner";
import SelectedDog from "./SelectedDog";
import NavUser from "./NavUser";

const MapView = () => {

    const [selectedDog, setSelectedDog] = useState();
    const [thatUser, setThatUser] = useState();
    const [thatUserLocation, setThatUserLocation] = useState();

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

    return (
        <div>
            <Map thatUser={thatUser} thatUserLocation={thatUserLocation} />
            <button onClick={updateLocation}>Broadcast my location</button>
            {/*<button onClick={ () => { navigate("/owner-profile")}}> Profile </button>*/}
            {/*Routes for each web page*/}
            <Routes>
                <Route path="/find-dogs" element={<FindDogs changedDogObj={setSelectedDog}/>}/>
                <Route path="/dog-requests" element={<DogRequests setThatUser={setThatUser}/>}/>
                <Route path="/nav-owner" element={<NavOwner thatUser={thatUser} setThatUserLocation={setThatUserLocation} />}/>
                <Route path="/selected-dog" element={<SelectedDog dogObj={selectedDog}/>}/>
                <Route path="/nav-user" element={<NavUser thatUser={thatUser} setThatUserLocation={setThatUserLocation} />}/>
            </Routes>
        </div>
    )
}

export default MapView;