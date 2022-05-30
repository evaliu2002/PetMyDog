import React, {useState} from 'react';
import {Route, Routes} from "react-router";
import Login from "./components/Login";
import FindDogs from './components/FindDogs'
import SelectedDog from "./components/SelectedDog";
import OwnerProfile from "./components/OwnerProfile"
import ViewDogProfile from "./components/ViewDogProfile";
import CreateDogProfile from "./components/CreateDogProfile";
import DogRequests from "./components/DogRequests";
import MapView from "./components/MapView";
import NavUser from "./components/NavUser";
import NavOwner from "./components/NavOwner";

const App = () => {

    const [selectedDog, setSelectedDog] = useState();

    return (
        <div id='App'>
            {/*Routes for each web page*/}
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/map-view" element={<MapView/>}>
                    <Route path="/map-view/find-dogs" element={<FindDogs/>}/>
                    <Route path="/map-view/dog-requests" element={<DogRequests/>}/>
                    <Route path="/map-view/nav-owner" element={<NavOwner/>}/>
                    <Route path="/map-view/selected-dog" element={<SelectedDog/>}/>
                    <Route path="/map-view/nav-user" element={<NavUser/>}/>
                </Route>
                <Route path="owner-profile" element={<OwnerProfile changedDogObject={setSelectedDog}/>}/>
                <Route path="view-dog-profile" element={<ViewDogProfile dogProfile={selectedDog}/>}/>
                <Route path="create-dog-profile" element={<CreateDogProfile/>}/>
            </Routes>
        </div>
    );
}

export default App;
