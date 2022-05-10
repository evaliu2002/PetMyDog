import React from 'react';
import { BsArrowLeftSquare } from "react-icons/bs";
import {useNavigate} from 'react-router';

const Logout = () => {
    let navigate = useNavigate();

    const login = () => {
        navigate("/")
    }

    return (
        <div className='logout'>
            <h1 className='font-link'>Pet My Dog</h1>
            <a className="btn btn-outline-dark" href="http://petmydog.fun/logout" role="button" style={{textTransform: "none"}}>
                <img width="20px" style={{marginBlock: "3px", marginRight: "5px"}} alt="Google sign-out"
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/>
                Logout from Google
            </a>
            <button id="reactButton" onClick={login}>Temporary Button for React Router</button>
        </div>
    )
}

export default Logout;