import React from 'react';
import {Route, Routes} from "react-router";
import Login from "./components/login/Login";
import FindDogs from './components/finddogs/FindDogs'
import SelectedDog from "./components/selecteddog/SelectedDog";
import OwnerProfile from "./components/ownerprofile/OwnerProfile"
import ViewDogProfile from "./components/viewdogprofile/ViewDogProfile";
import CreateDogProfile from "./components/createdogprofile/CreateDogProfile";

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
        return response.text();
    } else {
        return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
};

setInterval(updateLocation, UPDATE_EVERY);
updateLocation();

const App = () => {
    return (
        <div id='App'>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="find-dogs" element={<FindDogs />}/>
                <Route path="selected-dog" element={<SelectedDog />}/>
                <Route path="owner-profile" element={<OwnerProfile />}/>
                <Route path="view-dog-profile" element={<ViewDogProfile />}/>
                <Route path="create-dog-profile" element={<CreateDogProfile />}/>
            </Routes>
        </div>
    );
}

export default App;
