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
    let navigate = useNavigate();
    return (
        <div>
            <Map/>
            <button onClick={ () => { navigate("/owner-profile")}}> Profile </button>
            <Routes>
                <Route path="/find-dogs" element={<FindDogs changedDogObj={setSelectedDog}/>}/>
                <Route path="/dog-requests" element={<DogRequests/>}/>
                <Route path="/dog-requests/nav-owner" element={<NavOwner />}/>
                <Route path="/selected-dog/:id" element={<SelectedDog dogObj={selectedDog}/>}/>
                <Route path="/selected-dog/nav-user" element={<NavUser />}/>
            </Routes>
        </div>
    )
}

export default MapView;