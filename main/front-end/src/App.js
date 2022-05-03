import React from 'react';
import Login from "./components/login/Login";
// import { FindDogs } from './components/finddogs/FindDogs'
import { SelectedDog } from './components/selecteddog/SelectedDog';
import { NavUser } from './components/navuser/NavUser';
import {CreateDogProfile} from './components/createdogprofile/CreateDogProfile';
import {ViewDogProfile} from './components/viewdogprofile/ViewDogProfile';

const App = () => {
    return (
        <div id='App'>
            {/*<Login />*/}
            {/*<SelectedDog />*/}
            {/*<NavUser />*/}
            {/*<FindDogs />*/}
            <ViewDogProfile/>
        </div>
    );
}

export default App;
