import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {Card,Button,Container} from "react-bootstrap";


/**
 * Shows a list of created dog objects
 * @param changedDogObject
 * @returns {JSX.Element}
 * @constructor
 */
const OwnerProfile = ({changedDogObject}) => {

    const [ownerName, setOwnerName] = useState("Bob");
    const [dogProfiles, setDogProfiles] = useState([]);
    const GET_USER_PROFILE_URL = process.env.REACT_APP_BASE_URL + "/getMyProfile";

    let navigate = useNavigate();

    //Add more dog
    const createDogProfile = () => {
        navigate("/create-dog-profile")
    }

    //Go to the dog requests page
    const dogRequest = () => {
        navigate("/map-view/dog-requests")
    }

    //Show the full profile of the selected dog
    const selectedDog = async(e) => {
        await changedDogObject(JSON.parse(e.currentTarget.id));
        navigate("/view-dog-profile");
    }

    //Go to the log out page
    const logOut = () => {
        deleteAllCookies();
        navigate("/");
    }

    const findDogs = () => {
        navigate("/map-view/find-dogs");
    }

    const deleteAllCookies = () => {
        let cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }


    const checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300 || response.status === 0) {
            return response;
        } else {
            return Promise.reject(new Error(response.status + ": " + response.statusText));
        }
    };

    //get the user object and their dog list
    const updateOwnerProfile = () => {
        fetch(GET_USER_PROFILE_URL, {
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(async(response) =>{
                let userObj = await response.json();
                console.log(userObj);
                let userDog = userObj.dogs;
                console.log(userDog);
                setDogProfiles(userDog);
                console.log("Dogs displayed: " + JSON.stringify(userDog));
                let userName = userObj.username;
                setOwnerName(userName);
            })
    }

    useEffect( updateOwnerProfile,[]);

    //map each dog object to each card
    //using each dog as an id for selectedDog's event
    return (
        <div className="dog-container">

            <h2 className="font-link"> {ownerName}'s Profile </h2>
            <button className="navigate-buttons" onClick={dogRequest}>Requests</button>
            <button className="navigate-buttons" onClick={findDogs}>Find dogs</button>
            <button className="navigate-buttons" onClick={logOut}>Log out</button>
            <button className="navigate-buttons" onClick={createDogProfile}>Add dog</button>
            <Container fluid >
                <div className="dog-container">
                    {dogProfiles.map(dog => <div key={JSON.stringify(dog)}  >
                        <Card id={JSON.stringify(dog)} style={{width: '18rem', margin: '20px'}} >
                        <Card.Body>
                        <Card.Title> {dog.name}</Card.Title>
                        <Card.Text>
                        <p>Age: {dog.age}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Gender: {dog.gender}  </p>
                        <p>Breed: {dog.breed}</p>
                        </Card.Text>
                            <Button variant="primary" style={{margin : '10px'}} onClick={findDogs}>Go For A Walk</Button>
                            <Button variant="primary" id={JSON.stringify(dog)}  onClick={selectedDog}> View Dog</Button>
                        </Card.Body>
                        </Card>

                    </div>)}
                </div>
            </Container>
        </div>
    );
}

export default OwnerProfile;