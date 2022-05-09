import React, { useState, useEffect } from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from 'react-router';
import Map from '../map/Map';

const DogRequests = () => {
    let navigate = useNavigate();

    const ownerProfile = () => {
        navigate("/owner-profile")
    }

    const findDogs = () => {
        navigate("/map-view/find-dogs")
    }

    const navOwner = () => {
        navigate("/nav-owner")
    }

    const GET_REQ_URL = "http://localhost:4567/getRequests";

    const [requests, setRequests] = useState([]);
    let displayReq = [];
    const UPDATE_EVERY_MIN = 10 * 1000;

    const checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300 || response.status === 0) {
            return response;
        } else {
            return Promise.reject(new Error(response.status + ": " + response.statusText));
        }
    };

    const getRequest = () => {
        fetch(GET_REQ_URL, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            // .then(checkStatus)
            .then(() => {console.log("Received meetup request")})
            .then(async (response) => {

            })
            .catch(() => {console.log("Receiving meetup request failed")})
    }

    useEffect(getRequest, []);

    return (
        <div className='dogRequests'>
            <button onClick={findDogs}>Petter Mode</button>
            <BsFillPersonFill onClick={ownerProfile}/>
            <h4>Petting Requests</h4>
            {requests.map(req =>
                <div id={JSON.stringify(req)}>
                    {req}
                    <button onClick={navOwner}>Yes</button>
                    <button>No</button>
                </div>)}
        </div>
    );
}

export default DogRequests;