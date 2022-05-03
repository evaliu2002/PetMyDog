import React from 'react';
import {Route, Routes} from "react-router";
import Login from "./components/login/Login";
import FindDogs from './components/finddogs/FindDogs'
import SelectedDog from "./components/selecteddog/SelectedDog";

const App = () => {
    return (
        <div id='App'>
            {/*<Login />*/}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="find-dogs" element={<FindDogs />}/>
                <Route path="selected-dog" element={<SelectedDog />}/>
            </Routes>
        </div>
    );
}

export default App;
