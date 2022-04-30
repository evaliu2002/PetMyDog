import React from 'react';
import Login from "./components/login/Login";
// import { FindDogs } from './components/finddogs/FindDogs'
import { SelectedDog } from './components/selecteddog/SelectedDog';
import { NavUser } from './components/navuser/NavUser';

const App = () => {
    return (
        <div id='App'>
            <Login />
            <SelectedDog />
            <NavUser />
            {/*<FindDogs />*/}
        </div>
    );
}

export default App;
