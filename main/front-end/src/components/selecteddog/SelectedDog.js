import React, { useEffect } from 'react';
import { BsArrowLeftSquare, BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from 'react-router';

const SelectedDog = ({dogObj}) => {

    let navigate = useNavigate();

    const back = () => {
        navigate(-1)
    }

    const REQ_MEET_URL = "http://petmydog.fun/requestMeetup";

    const navUser = () => {
        fetch(REQ_MEET_URL, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: { receiver: dogObj.ownerID }
        })
            .then(() => {console.log("Sent meetup request")})
            .catch(() => {console.log("Send meetup request failed")})
        navigate("/nav-user")
    }

    const ownerProfile = () => {
        navigate("/owner-profile")
    }

    useEffect(() => {
        console.log(dogObj);
    })

    return (
        <div>
            <h3>{ dogObj.name }</h3>

            <BsArrowLeftSquare onClick={back}/>

            <BsFillPersonFill onClick={ownerProfile}/>

            <h5>About { dogObj.name }</h5>
            <p>Age: { dogObj.age }</p>
            <p>Breed: { dogObj.breed }</p>

            {/* <img></img> */}

            <button onClick={navUser}>Go to Dog</button>
        </div>
    );
}

export default SelectedDog;