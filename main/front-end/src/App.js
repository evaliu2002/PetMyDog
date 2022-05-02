import React from 'react';
import { Login } from './components/login/Login';
import { Signup } from './components/signup/Signup';
import { FindDogs } from './components/finddogs/FindDogs'
import { SelectedDog } from './components/selecteddog/SelectedDog';
import { NavUser } from './components/navuser/NavUser';
import  ViewDogProfile  from './components/viewdogprofile/ViewDogProfile';

class App extends React.Component {
    render() {
        return (
            <div>
                <Login />
                <Signup />
                <FindDogs />
                <SelectedDog />
                <NavUser />
                <ViewDogProfile/>
            </div>
        );
    }
}

export default App;
