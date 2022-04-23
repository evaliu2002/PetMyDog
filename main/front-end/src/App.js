import React from 'react';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import {CreateDogProfile} from './components/CreateDogProfile';

class App extends React.Component {
    render() {
        return (
            <div>
                <Login />
                <Signup />
                <CreateDogProfile />
            </div>
        );
    }
}

export default App;
