import React from 'react';
import "./Login.css";
import {useNavigate} from 'react-router';

const Login = () => {
    // useNavigate for event handling to other web pages
    let navigate = useNavigate();
    const mapView = () => {
        navigate("/map-view/find-dogs")
    }

    const dogRequests = () => {
        navigate("/map-view/dog-requests")
    }

    const navUser = () => {
        navigate("/map-view/nav-user")
    }

    const navOwner = () => {
        navigate("/map-view/nav-owner")
    }

    // Styling
    const headingStyle = {
        color: "#E5737D",
        fontSize: "200",
        textAlign:'center'
    }
    const anchorStyle = {
        fontSize: "100",
        textTransform: "none",
        marginBlock: "20px",
        borderStyle: "solid",
        borderWidth: 1,
    }
    const buttonStyle = {
        // borderWidth: "10",
        marginBlock: "20px",
        marginRight: "5px",
    }

    return (
        <div className='login'>
            <h1 className='font-link' style={{color: "#E5737D"}}>Pet My Dog</h1>
            {/*Google Login Button*/}
            <a className="btn btn-outline-dark" href={process.env.REACT_APP_BASE_URL + "/login"} role="button" style={{textTransform: "none"}}>
                <img width="20px" style={{marginBlock: "3px", marginRight: "5px"}} alt="Google sign-in"
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/>
                Login with Google
            </a>
            <button id="reactButton" onClick={mapView}>Temporary Button for React Router</button>
            <button id="dogReqButton" onClick={dogRequests}>Temporary Button to dog requests</button>
            <button id="navUserButton" onClick={navUser}>Temporary Button to nav user</button>
            <button id="navOwnerButton" onClick={navOwner}>Temporary Button to nav owner</button>
        </div>
    )
}

export default Login;