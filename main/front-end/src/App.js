import React from 'react';
import { Login } from './components/login/Login';
import { FindDogs } from './components/finddogs/FindDogs'
import { SelectedDog } from './components/selecteddog/SelectedDog';
import { NavUser } from './components/navuser/NavUser';

class App extends React.Component {
    render() {
        return (
            <div>
                <Login />
                <FindDogs />
                <SelectedDog />
                <NavUser />
            </div>
        );
    }
}

export default App;
