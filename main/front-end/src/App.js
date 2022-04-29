import React, { useState }from 'react';
import GoogleLogin from 'react-google-login';
// import { useHistory } from "react-router-dom";
import { FindDogs } from './components/finddogs/FindDogs'
import { SelectedDog } from './components/selecteddog/SelectedDog';
import { NavUser } from './components/navuser/NavUser';

function App() {
    const [loginData, setLoginData] = useState(
            localStorage.getItem('loginData')
            ? JSON.parse(localStorage.getItem('loginData'))
            : null
    );

    const handleFailure = (result) => {
        alert(result);
    };

    const handleLogin = async (googleData) => {
        const res = await fetch('callback?client_name=OidcClient', {
            method: 'POST',
            body: JSON.stringify({
                token: googleData.tokenId,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();
        setLoginData(data);
        localStorage.setItem('loginData', JSON.stringify(data));
    };

    const handleLogout = () => {
        localStorage.removeItem('loginData');
        setLoginData(null);
    };

    return (
        <div>
            <div className='Login' style={{ backgroundColor: "#E5737D", width: "3500px", minHeight: "3500px"}}>
                <header className='Login-header'>
                <h1 className="font-link">Pet My Dog</h1>
                    <div className='google-login'>
                        {loginData ? (
                            <div>
                                <h3>You logged in as {loginData.email}</h3>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        ) : (
                            <GoogleLogin
                                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                buttonText="Log in with Google"
                                onSuccess={handleLogin}
                                onFailure={handleFailure}
                                cookiePolicy={'single_host_origin'}
                            ></GoogleLogin>
                        )}
                    </div>
                </header>
            </div>
            <FindDogs />
            <SelectedDog />
            <NavUser />
        </div>
    );
}

export default App;
