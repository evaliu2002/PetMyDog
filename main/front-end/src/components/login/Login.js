import React from 'react';
import GoogleLogin from 'react-google-login';

export class Login extends React.Component {
    render() {
        const handleFailure = (result) => {
            alert(result);
        };
        const handleLogin = (googleData) => {
            console.log(googleData);
        }
        return (
            <div>
                <h1 className="">Pet My Dog</h1>
                <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}
                ></GoogleLogin>
            </div>
        )
    }
}