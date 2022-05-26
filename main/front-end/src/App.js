import React, {useState} from 'react';
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

const App = () => {

    const [selectedDog, setSelectedDog] = useState();

    return (
        <div id='App'>
            {/*Routes for each web page*/}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/map-view" element={<MapView />}>
                    <Route path="/map-view/find-dogs" element={<FindDogs />}/>
                    <Route path="/map-view/dog-requests" element={<DogRequests/>}/>
                    <Route path="/map-view/nav-owner" element={<NavOwner />}/>
                    <Route path="/map-view/selected-dog" element={<SelectedDog />}/>
                    <Route path="/map-view/nav-user" element={<NavUser />}/>
                </Route>
                <Route path="owner-profile" element={<OwnerProfile changedDogObject={setSelectedDog} />}/>
                <Route path="view-dog-profile" element={<ViewDogProfile dogProfile={selectedDog} />}/>
                <Route path="create-dog-profile" element={<CreateDogProfile  />}/>
            </Routes>
        </div>
    );
}

export default App;
