import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const DogRequests = (props) => {
    // useNavigate for event handling to other web pages
    let navigate = useNavigate();

    const findDogs = () => {
        navigate("/map-view/find-dogs");
    }

    const DirectionForUser = (thatUser) => {
        props.setThatUser(thatUser);
        navigate("/map-view/nav-user")
    }

    const DirectionForOwner = (thatUser) => {
        props.setThatUser(thatUser);
        navigate("/map-view/nav-owner");
    }

    const [senderReqs, setSenderReqs] = useState([]);
    const [receiverReqs, setReceiverReqs] = useState([]);
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

    const REQ_MEET_URL = process.env.REACT_APP_BASE_URL + "/meetups";

    const MY_PROF_URL = process.env.REACT_APP_BASE_URL + "/getMyProfile"

    let reqSArr = [];
    let reqRArr = [];
    let UID;

    /**
     * Getting requests from users from back-end endpoint
     */
    const requestMeetup = () => fetch(MY_PROF_URL, {
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(checkStatus)
            .then(async (response) => {
                let userProfile = (await response.json());
                UID = userProfile.uid;
            })
        fetch(REQ_MEET_URL, {
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(UID)
        })
            .then(checkStatus)
            .then(async (response) => {
                let reqObj = (await response.json());
                console.log(reqObj)
                if (reqObj !== "No meetups") {
                    for (let i = 0; i < reqObj.length; i++) {
                        if (JSON.stringify(reqObj[i].sender) === JSON.stringify(UID)) {
                            reqSArr.push(reqObj[i])
                        } else if (JSON.stringify(reqObj[i].receiver) === JSON.stringify(UID)) {
                            reqRArr.push(reqObj[i])
                        }
                    }
                }
                setSenderReqs(reqSArr);
                setReceiverReqs(reqRArr);
            })
            .catch(() => {console.log("Receiving meetup request failed")})

    const ACPT_MEET_URL = process.env.REACT_APP_BASE_URL + "/acceptMeetup";
    /**
     * Accepting meetup requests
     * @param mid
     * @returns {string}
     */
    const acceptRequest = (mid) => fetch(ACPT_MEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({mid: mid})
    })
            .then(checkStatus)
            .then(() => {console.log("Accepted Meetup")})
            .catch(() => {console.log("Accepting meetup failed")});

    const REJC_MEET_URL = process.env.REACT_APP_BASE_URL + "/rejectMeetup";
    /**
     * Rejecting Meetup Requests
     * @param mid
     * @returns {string}
     */
    const rejectMeetup = (mid) => {
        fetch(REJC_MEET_URL, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({mid: mid})
        })
            .then(checkStatus)
            .then(() => {console.log("Rejected Meetup")})
            .catch(() => {console.log("Rejecting meetup failed")})
        return mid;
    }

    useEffect(() => requestMeetup, []);

    return /*{requestMeetup, acceptRequest}*/(
        <div className='dogRequests'>
            <button className="top-buttons" onClick={findDogs}>Find Dogs</button>
            <button className="top-buttons" onClick={requestMeetup}>Refresh Requests</button>
            <h4 className='header'>Petting Requests</h4>
            {receiverReqs.map(req =>
                <div>
                    {req.senderProfile.username + " would like to request to pet "
                        + req.receiverProfile.username + "'s dog"}
                    <br />
                    {"Status: " + req.status}
                    <br />
                    <button onClick={() => {acceptRequest(req.mid);}}>Yes</button>
                    <button onClick={() => {rejectMeetup(req.mid);}}>No</button>
                    <button onClick={() => {DirectionForOwner(req.senderProfile);}}>Get direction to user</button>
                </div>)}
            {senderReqs.map(req =>
                <div>
                    {req.senderProfile.username + " would like to request to pet "
                        + req.receiverProfile.username + "'s dog"}
                    <br />
                    {"Status: " + req.status}
                    <br />
                    <button onClick={() => {DirectionForUser(req.receiverProfile);}}>Get direction to owner</button>
                </div>)}
        </div>
    );
}

export default DogRequests;