import React from 'react';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import {CreateDogProfile} from './components/CreateDogProfile';
import { FindDogs } from './components/FindDogs'
import { DogsProfilePrewview } from './components/DogsProfilePreview';
import { NavigationUser } from './components/NavigationUser';

class App extends React.Component {
    render() {
        return (
            <div>
                <Login />
                <Signup />
                <CreateDogProfile />
                <FindDogs />
                <DogsProfilePrewview />
                <NavigationUser />
            </div>
        );
    }
}

export default App;
