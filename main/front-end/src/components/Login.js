import React from 'react';
import "../styling/index.css"
import {useNavigate} from 'react-router';

const Login = () => {
    // useNavigate for event handling to other web pages
    let navigate = useNavigate();
    const findDogs = () => {
        navigate("/map-view/find-dogs")
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
            <button id="reactButton" onClick={findDogs}>Start Your Journey</button>
        </div>
    )
}

export default Login;