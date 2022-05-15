import React, { useState, useEffect } from 'react';
import { BsArrowLeftSquare } from "react-icons/bs";
import './OwnerProfile.css';
import { useNavigate } from 'react-router';
import {Card,Button,Container} from "react-bootstrap";



const OwnerProfile = () => {
    const [ownerName, setOwnerName] = useState("Bob");
    const [dogProfiles, setDogProfiles] = useState([]);
    const [selectedDog, setSelectedDog] = useState();

    const GET_USER_PROFILE_URL = "http://localhost:4567/profile";
    let displayDogs= [];
    let navigate = useNavigate();

    const createDogProfile = () => {
        navigate("/create-dog-profile")
    }

    const findDogs = () => {
        navigate("/map-view/dog-requests")
    }

    const checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300 || response.status === 0) {
            return response;
        } else {
            return Promise.reject(new Error(response.status + ": " + response.statusText));
        }
    };


    const updateOwnerProfile = () => {
        fetch(GET_USER_PROFILE_URL, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })
            .then(async(response) =>{
                let uidArr = ["101836349121923215589"];
                displayDogs = [];
                let fetches = [];
                for (let i = 0; i <uidArr.length; i++) {
                    let currentFetch = fetch(GET_USER_PROFILE_URL + "?uid=" + uidArr[i], {
                    })
                        .then(checkStatus)
                        .then(async (response)=>{
                            let userObj = await response.json();
                            let userDog = userObj.dogs;
                            for (let j = 0; j < userDog.length; j++) {
                                userDog[j].ownerID = userObj.uid;
                            }
                            displayDogs = displayDogs.concat(userObj.dogs);
                        })
                    fetches.push(currentFetch);
                }
                await Promise.all(fetches);
                setDogProfiles(displayDogs);
                console.log("Dogs displayed: " + JSON.stringify(displayDogs));
            })
    }




    useEffect( updateOwnerProfile,[]);

    return (
        <div className="owner-profile">
            <h2 className="font-link"> Bob's Profile </h2>

            <button className="add-more"  onClick={createDogProfile}>add more</button>

            <Container fluid>
                <div className= "row justify-content-md-center" >

                    {dogProfiles.map(dog => <div id={JSON.stringify(dog)} onClick={selectedDog}>

                        <Card style={{ width: '18rem', margin: '20px'}}>
                            <Card.Img variant="top" src= dog.pic_link />
                            <Card.Body>
                                <Card.Title>dog.name</Card.Title>
                                <Card.Text>
                                    <p>Age: dog.age   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Gender: dog.gender  </p>
                                    <p>Breed: dog.breed</p>
                                    {/*<p>Biography: dog.bio </p>*/}
                                </Card.Text>
                                <Button variant="primary" onClick={findDogs}>Go For A Walk</Button>
                            </Card.Body>
                        </Card>

                    </div>)}
                </div>
            </Container>

        </div>
    );
}

export default OwnerProfile;