import React from 'react';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { FindDogs } from './components/FindDogs'

class App extends React.Component {
    render() {
        return (
            <div>
                <Login />
                <Signup />
                <FindDogs />
            </div>
        );
    }
}

export default App;
