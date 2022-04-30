import React from 'react';
import Login from "./components/login/Login";
import FindDogs from './components/finddogs/FindDogs'
import {Route, Routes} from "react-router";

const App = () => {
    return (
        <div id='App'>
            <Login/>
            <Routes>
                <Route path="http://localhost:3001" element={<Login />} />
                <Route path="main/front-end/src/components/finddogs/FindDogs.js" element={<FindDogs />}/>
            </Routes>
        </div>
    );
}

export default App;
