import React, { useState, useEffect } from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from 'react-router';
import Map from '../map/Map';

const DogRequests = () => {
    // useNavigate for event handling to other web pages
    let navigate = useNavigate();
    const ownerProfile = () => {
        navigate("/owner-profile")
    }
    const findDogs = () => {
        navigate("/map-view/find-dogs")
    }
    const navOwner = () => {
        navigate("/map-view/nav-owner")
    }

    const [noMeetUp, setNoMeetUp] = useState("");
    const [requests, setRequests] = useState([]);
    const UPDATE_EVERY_MIN = 10 * 1000;

    /**
     * Get back-end response
     * @param response
     * @returns {Promise<never>|*}
     */
    const checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300 || response.status === 0) {
            return response;
        } else {
            return Promise.reject(new Error(response.status + ": " + response.statusText));
        }
    };

    const REQ_MEET_URL = "https://localhost:4567/meetups";

    const MY_PROF_URL = "https://localhost:4567/getMyProfile"

    /**
     * Getting requests from users from back-end endpoint
     */
    const requestMeetup = () => {
        let userProfileUID;
        let reqArr = [];
        let dogArr = [];
        fetch(MY_PROF_URL, {
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(checkStatus)
            .then(async (response) => {
                let userProfile = (await response.json());
                userProfileUID = userProfile.uid;
                console.log("uid: " + JSON.stringify(userProfileUID))
            })
        fetch(REQ_MEET_URL, {
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userProfileUID)
        })
            .then(checkStatus)
            .then(async (response) => {
                let reqObj = (await response.json());
                console.log("reqObj: " + reqObj)
                if (reqObj !== "No meetups") {
                    for (let i = 0; i < reqObj.length; i++) {
                        dogArr.push(JSON.stringify(reqObj[i]))
                    }
                }
                console.log("dogArr: " + dogArr)
                reqArr.concat(JSON.stringify(reqObj))
                setRequests(dogArr)
                console.log("requests: " + requests);
            })
            .catch(() => {console.log("Receiving meetup request failed")})
    }

    const ACPT_MEET_URL = "https://localhost:4567/acceptMeetup";

    const acceptRequest = () => {
        fetch(ACPT_MEET_URL, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(checkStatus)
            .then(navOwner)
            .then(() => {console.log("Accepted Meetup")})
            .catch(() => {console.log("Accepting meetup failed")})
    }

    const REJC_MEET_URL = "https://localhost:4567/rejectMeetup";

    const rejectMeetup = () => {
        fetch(REJC_MEET_URL, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(checkStatus)
            .then(navOwner)
            .then(() => {console.log("Rejected Meetup")})
            .catch(() => {console.log("Rejecting meetup failed")})
    }

    useEffect(requestMeetup, []);

    return (
        <div className='dogRequests'>
            <button onClick={findDogs}>Petter Mode</button>
            <BsFillPersonFill onClick={ownerProfile}/>
            <h4>Petting Requests</h4>
            {/*<div id={JSON.stringify(noMeetUp)}>*/}
            {/*    <p>{JSON.stringify(noMeetUp)}</p>*/}
            {/*    <button onClick={acceptRequest}>Yes</button>*/}
            {/*    <button onClick={rejectMeetup}>No</button>*/}
            {/*</div>*/}
                {requests.map(req =>
                    <div id={JSON.stringify(req)}>
                        {JSON.stringify(req)}
                        <button onClick={acceptRequest}>Yes</button>
                        <button onClick={rejectMeetup}>No</button>
                    </div>)}
                {console.log(requests)}
        </div>
    );
}

export default DogRequests;