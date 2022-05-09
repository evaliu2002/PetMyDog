import React from 'react';
import {Route, Routes} from "react-router";
import Login from "./components/login/Login";
import FindDogs from './components/finddogs/FindDogs'
import SelectedDog from "./components/selecteddog/SelectedDog";
import OwnerProfile from "./components/ownerprofile/OwnerProfile"
import ViewDogProfile from "./components/viewdogprofile/ViewDogProfile";
import CreateDogProfile from "./components/createdogprofile/CreateDogProfile";
import DogRequests from "./components/DogRequests/DogRequests";
import MapView from "./components/mapview/MapView";
import NavUser from "./components/navuser/NavUser";
import NavOwner from "./components/navowner/NavOwner";

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
                <Route path="/map-view" element={<MapView />}>
                    <Route path="/map-view/find-dogs" element={<FindDogs />}/>
                    <Route path="/map-view/dog-requests" element={<DogRequests/>}/>
                    <Route path="/map-view/nav-owner" element={<NavOwner />}/>
                    <Route path="/map-view/selected-dog" element={<SelectedDog />}/>
                    <Route path="/map-view/nav-user" element={<NavUser />}/>
                </Route>
                <Route path="owner-profile" element={<OwnerProfile />}/>
                <Route path="view-dog-profile" element={<ViewDogProfile />}/>
                <Route path="create-dog-profile" element={<CreateDogProfile />}/>
            </Routes>
        </div>
    );
}

export default App;
