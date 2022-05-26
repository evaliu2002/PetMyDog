import React, { useState, useEffect } from 'react';
import { BsArrowLeftSquare } from "react-icons/bs";
import './OwnerProfile.css';
import { useNavigate } from 'react-router';
import {Card,Button,Container} from "react-bootstrap";



const OwnerProfile = ({changedDogObject}) => {

    const [ownerName, setOwnerName] = useState("Bob");
    const [dogProfiles, setDogProfiles] = useState([]);
    const GET_USER_PROFILE_URL = process.env.REACT_APP_BASE_URL + "/getMyProfile";

    let navigate = useNavigate();

    const createDogProfile = () => {
        navigate("/create-dog-profile")
    }

    const findDogs = () => {
        navigate("/map-view/dog-requests")
    }

    const selectedDog = async(e) => {
        await changedDogObject(JSON.parse(e.currentTarget.id));
        navigate("/view-dog-profile");
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

    return (
        <div className="owner-profile">
            <h2 className="font-link"> {ownerName}'s Profile </h2>

            <button className="add-more"  onClick={createDogProfile}>add more</button>

            <Container fluid >
                <div className="dog-container">

                    {dogProfiles.map(dog => <div key={JSON.stringify(dog)}  >

                        <Card id={JSON.stringify(dog)} style={{width: '18rem', margin: '20px'}} >
                        <Card.Img variant="top" src= "https://www.pumpkin.care/dog-breeds/wp-content/uploads/2021/03/Husky-Hero.png"  />
                        <Card.Body>
                        <Card.Title> {dog.name}</Card.Title>
                        <Card.Text>
                        <p>Age: {dog.age}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Gender: {dog.gender}  </p>
                        <p>Breed: {dog.breed}</p>
                        </Card.Text>
                        <Button variant="primary" onClick={findDogs}>Go For A Walk</Button>
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