import React from 'react';
import Login from "./components/login/Login";
import FindDogs from './components/finddogs/FindDogs'
import {Route, Routes} from "react-router";

const App = () => {
    return (
        <div id='App'>
            <Login />
            <Routes>
                <Route path="http://localhost:3000" element={<Login />} />
                <Route path="main/front-end/src/components/finddogs/FindDogs.js" element={<FindDogs />}/>
                <Route path="main/front-end/src/components/selecteddog/SelectedDog.js" element={<SelectedDog />}/>
            </Routes>
        </div>
    );
}

export default App;
