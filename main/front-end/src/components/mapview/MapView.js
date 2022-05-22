import React, {useState} from 'react';
import Map from '../map/Map';
import {Route, useNavigate, Routes} from 'react-router';
import FindDogs from "../finddogs/FindDogs";
import DogRequests from "../DogRequests/DogRequests";
import NavOwner from "../navowner/NavOwner";
import SelectedDog from "../selecteddog/SelectedDog";
import NavUser from "../navuser/NavUser";

const MapView = () => {

    const [selectedDog, setSelectedDog] = useState();
    const [thatUser, setThatUser] = useState();
    const [thatUserLocation, setThatUserLocation] = useState();

    return (
        <div>
            <Map thatUser={thatUser} thatUserLocation={thatUserLocation} />
            {/*<button onClick={ () => { navigate("/owner-profile")}}> Profile </button>*/}
            {/*Routes for each web page*/}
            <Routes>
                <Route path="/find-dogs" element={<FindDogs changedDogObj={setSelectedDog}/>}/>
                <Route path="/dog-requests" element={<DogRequests setThatUser={setThatUser}/>}/>
                <Route path="/dog-requests/nav-owner" element={<NavOwner thatUser={thatUser} setThatUserLocation={setThatUserLocation} />}/>
                <Route path="/selected-dog" element={<SelectedDog dogObj={selectedDog}/>}/>
                <Route path="/selected-dog/nav-user" element={<NavUser thatUser={thatUser} setThatUserLocation={setThatUserLocation} />}/>
            </Routes>
        </div>
    )
}

export default MapView;