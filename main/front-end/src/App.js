import React from 'react';
import { Login } from './components/Login';
import { Signup } from './components/Signup';

class App extends React.Component {
    render() {
        return (
            <div>
                <Login />
                <Signup />
            </div>
        );
    }
}

export default App;
