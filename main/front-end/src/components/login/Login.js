import React from 'react';
import "./Login.css";
// import { useHistory } from "react-router-dom";

const Login = () => {
    return (
        <div id='Login'>
            <h1 className='font-link'>Pet My Dog</h1>
            <div id='GoogleLogin'>
                <a href='http://localhost:4567/login'>Login with Google</a>
            </div>
        </div>
    )
}

export default Login;