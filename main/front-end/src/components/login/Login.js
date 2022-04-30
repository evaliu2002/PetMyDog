import React from 'react';
import "./Login.css";
// import { useHistory } from "react-router-dom";

const Login = () => {
    return (
        <div className='Login'>
            <h1 className='font-link'>Pet My Dog</h1>
            <a className="btn btn-outline-dark" href="http://localhost:4567/login" role="button" style={{textTransform: "none"}}>
                <img width="20px" style={{marginBlock: "3px", marginRight: "5px"}} alt="Google sign-in"
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/>
                Login with Google
            </a>
        </div>
    )
}

export default Login;