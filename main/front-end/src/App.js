import React from 'react';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { FindDogs } from './components/FindDogs'
import { DogsProfilePrewview } from './components/DogsProfilePreview';
import { NavigationUser } from './components/NavigationUser';

class App extends React.Component {
    render() {
        return (
            <div>
                <Login />
                <Signup />
                <FindDogs />
                <DogsProfilePrewview />
                <NavigationUser />
            </div>
        );
    }
}

export default App;
